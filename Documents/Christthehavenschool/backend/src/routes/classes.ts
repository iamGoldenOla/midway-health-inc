import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { eq, and, or, sql } from 'drizzle-orm';
import { classes, teachers, students, enrollments, userProfiles } from '../database/schema';
import { db } from '../database';

// Zod schemas for validation
const createClassSchema = z.object({
  name: z.string().max(100),
  gradeLevel: z.string().max(10),
  teacherId: z.string().uuid().optional(),
});

const updateClassSchema = z.object({
  name: z.string().max(100).optional(),
  gradeLevel: z.string().max(10).optional(),
  teacherId: z.string().uuid().optional(),
});

const classRoutes: FastifyPluginAsync = async (fastify) => {
  // Get all classes with teacher information
  fastify.get('/classes', 
    { preValidation: fastify.authenticate },
    async (request, reply) => {
      try {
        const classList = await db
          .select({
            id: classes.id,
            name: classes.name,
            gradeLevel: classes.gradeLevel,
            teacherId: classes.teacherId,
            teacherName: userProfiles.fullName,
            createdAt: classes.createdAt,
          })
          .from(classes)
          .leftJoin(teachers, eq(classes.teacherId, teachers.id))
          .leftJoin(userProfiles, eq(teachers.userId, userProfiles.id));

        return classList;
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Get class by ID with students enrolled
  fastify.get<{ Params: { id: string } }>(
    '/classes/:id',
    { preValidation: fastify.authenticate },
    async (request, reply) => {
      try {
        const { id } = request.params;

        // Get class details
        const [classDetails] = await db
          .select({
            id: classes.id,
            name: classes.name,
            gradeLevel: classes.gradeLevel,
            teacherId: classes.teacherId,
            teacherName: userProfiles.fullName,
            createdAt: classes.createdAt,
          })
          .from(classes)
          .leftJoin(teachers, eq(classes.teacherId, teachers.id))
          .leftJoin(userProfiles, eq(teachers.userId, userProfiles.id))
          .where(eq(classes.id, id));

        if (!classDetails) {
          return reply.code(404).send({ error: 'Class not found' });
        }

        // Get students enrolled in this class
        const enrolledStudents = await db
          .select({
            id: students.id,
            userId: students.userId,
            fullName: userProfiles.fullName,
            gradeLevel: students.gradeLevel,
          })
          .from(enrollments)
          .leftJoin(students, eq(enrollments.studentId, students.id))
          .leftJoin(userProfiles, eq(students.userId, userProfiles.id))
          .where(eq(enrollments.classId, id));

        return {
          ...classDetails,
          students: enrolledStudents,
        };
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Create class
  fastify.post<{ Body: z.infer<typeof createClassSchema> }>(
    '/classes',
    { preValidation: [fastify.authenticate, fastify.requireRole(['admin'])] },
    async (request, reply) => {
      try {
        const validatedData = createClassSchema.parse(request.body);

        const [newClass] = await db
          .insert(classes)
          .values(validatedData)
          .returning();

        return newClass;
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.code(400).send({ error: 'Validation failed', details: error.errors });
        }
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Update class
  fastify.put<{ Params: { id: string }; Body: z.infer<typeof updateClassSchema> }>(
    '/classes/:id',
    { preValidation: [fastify.authenticate, fastify.requireRole(['admin'])] },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const validatedData = updateClassSchema.parse(request.body);

        const [updatedClass] = await db
          .update(classes)
          .set({ ...validatedData, updatedAt: new Date() })
          .where(eq(classes.id, id))
          .returning();

        if (!updatedClass) {
          return reply.code(404).send({ error: 'Class not found' });
        }

        return updatedClass;
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.code(400).send({ error: 'Validation failed', details: error.errors });
        }
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Delete class
  fastify.delete<{ Params: { id: string } }>(
    '/classes/:id',
    { preValidation: [fastify.authenticate, fastify.requireRole(['admin'])] },
    async (request, reply) => {
      try {
        const { id } = request.params;

        const deletedClasses = await db
          .delete(classes)
          .where(eq(classes.id, id))
          .returning();

        if (deletedClasses.length === 0) {
          return reply.code(404).send({ error: 'Class not found' });
        }

        return { message: 'Class deleted successfully' };
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Enroll student in class
  fastify.post<{ Body: { studentId: string; classId: string } }>(
    '/classes/enroll',
    { preValidation: [fastify.authenticate, fastify.requireRole(['admin', 'teacher'])] },
    async (request, reply) => {
      try {
        const { studentId, classId } = request.body;

        // Verify student and class exist
        const [student] = await db
          .select()
          .from(students)
          .where(eq(students.id, studentId));

        const [classRecord] = await db
          .select()
          .from(classes)
          .where(eq(classes.id, classId));

        if (!student || !classRecord) {
          return reply.code(404).send({ error: 'Student or class not found' });
        }

        // Check if enrollment already exists
        const [existingEnrollment] = await db
          .select()
          .from(enrollments)
          .where(
            and(
              eq(enrollments.studentId, studentId),
              eq(enrollments.classId, classId)
            )
          );

        if (existingEnrollment) {
          return reply.code(409).send({ error: 'Student already enrolled in this class' });
        }

        // Create enrollment
        const [enrollment] = await db
          .insert(enrollments)
          .values({
            studentId,
            classId,
          })
          .returning();

        return { message: 'Student enrolled successfully', enrollment };
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );
};

export { classRoutes };