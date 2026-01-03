import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

// Import schema
import { students, userProfiles } from '../database/schema';
import { db } from '../database';

// Zod schemas for validation
const createStudentSchema = z.object({
  userId: z.string().uuid(),
  gradeLevel: z.string().max(10),
  guardianContact: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
  }).optional(),
});

const updateStudentSchema = z.object({
  gradeLevel: z.string().max(10).optional(),
  guardianContact: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
  }).optional(),
});

const studentRoutes: FastifyPluginAsync = async (fastify) => {
  // Get student profile
  fastify.get<{ Params: { id: string } }>(
    '/students/:id',
    { preValidation: fastify.authenticate },
    async (request, reply) => {
      try {
        const { id } = request.params;
        
        const result = await db
          .select({
            id: students.id,
            userId: students.userId,
            gradeLevel: students.gradeLevel,
            guardianContact: students.guardianContact,
            enrollmentDate: students.enrollmentDate,
            fullName: userProfiles.fullName,
            role: userProfiles.role,
          })
          .from(students)
          .leftJoin(userProfiles, eq(students.userId, userProfiles.id))
          .where(eq(students.id, id));

        if (result.length === 0) {
          return reply.code(404).send({ error: 'Student not found' });
        }

        return result[0];
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Create student
  fastify.post<{ Body: z.infer<typeof createStudentSchema> }>(
    '/students',
    { preValidation: [fastify.authenticate, fastify.requireRole(['admin'])] },
    async (request, reply) => {
      try {
        // Validate input
        const validatedData = createStudentSchema.parse(request.body);
        
        const [newStudent] = await db
          .insert(students)
          .values(validatedData)
          .returning();

        return newStudent;
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.code(400).send({ error: 'Validation failed', details: error.errors });
        }
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Update student
  fastify.put<{ Params: { id: string }; Body: z.infer<typeof updateStudentSchema> }>(
    '/students/:id',
    { preValidation: [fastify.authenticate, fastify.requireRole(['admin', 'teacher'])] },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const validatedData = updateStudentSchema.parse(request.body);

        const [updatedStudent] = await db
          .update(students)
          .set({ ...validatedData, updatedAt: new Date() })
          .where(eq(students.id, id))
          .returning();

        if (!updatedStudent) {
          return reply.code(404).send({ error: 'Student not found' });
        }

        return updatedStudent;
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.code(400).send({ error: 'Validation failed', details: error.errors });
        }
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Delete student
  fastify.delete<{ Params: { id: string } }>(
    '/students/:id',
    { preValidation: [fastify.authenticate, fastify.requireRole(['admin'])] },
    async (request, reply) => {
      try {
        const { id } = request.params;

        const deletedStudents = await db
          .delete(students)
          .where(eq(students.id, id))
          .returning();

        if (deletedStudents.length === 0) {
          return reply.code(404).send({ error: 'Student not found' });
        }

        return { message: 'Student deleted successfully' };
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );
};

export { studentRoutes };