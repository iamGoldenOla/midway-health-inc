import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { eq, and } from 'drizzle-orm';
import { formTemplates, formSubmissions, userProfiles } from '../database/schema';
import { db } from '../database';

// Zod schemas for validation
const createFormTemplateSchema = z.object({
  name: z.string().max(255),
  description: z.string().optional(),
  fields: z.record(z.any()), // JSON schema for form fields
});

const submitFormSchema = z.object({
  formId: z.string().uuid(),
  answers: z.record(z.any()), // Submitted form data
});

const formsRoutes: FastifyPluginAsync = async (fastify) => {
  // Get all form templates
  fastify.get('/forms/templates', 
    { preValidation: fastify.authenticate },
    async (request, reply) => {
      try {
        const templates = await db
          .select()
          .from(formTemplates);

        return templates;
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Get form template by ID
  fastify.get<{ Params: { id: string } }>(
    '/forms/templates/:id',
    { preValidation: fastify.authenticate },
    async (request, reply) => {
      try {
        const { id } = request.params;

        const [template] = await db
          .select()
          .from(formTemplates)
          .where(eq(formTemplates.id, id));

        if (!template) {
          return reply.code(404).send({ error: 'Form template not found' });
        }

        return template;
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Create form template
  fastify.post<{ Body: z.infer<typeof createFormTemplateSchema> }>(
    '/forms/templates',
    { preValidation: [fastify.authenticate, fastify.requireRole(['admin'])] },
    async (request, reply) => {
      try {
        const validatedData = createFormTemplateSchema.parse(request.body);

        const [newTemplate] = await db
          .insert(formTemplates)
          .values(validatedData)
          .returning();

        return newTemplate;
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.code(400).send({ error: 'Validation failed', details: error.errors });
        }
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Submit form
  fastify.post<{ Body: z.infer<typeof submitFormSchema> }>(
    '/forms/submit',
    { preValidation: fastify.authenticate },
    async (request, reply) => {
      try {
        const validatedData = submitFormSchema.parse(request.body);
        
        // @ts-expect-error - user is attached by JWT verification
        const userId = request.user.id;

        // Verify form template exists
        const [template] = await db
          .select()
          .from(formTemplates)
          .where(eq(formTemplates.id, validatedData.formId));

        if (!template) {
          return reply.code(404).send({ error: 'Form template not found' });
        }

        // Create form submission
        const [submission] = await db
          .insert(formSubmissions)
          .values({
            formId: validatedData.formId,
            userId: userId,
            answers: validatedData.answers,
          })
          .returning();

        return { message: 'Form submitted successfully', submissionId: submission.id };
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.code(400).send({ error: 'Validation failed', details: error.errors });
        }
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // Get form submissions for a specific form
  fastify.get<{ Params: { id: string } }>(
    '/forms/:id/submissions',
    { preValidation: [fastify.authenticate, fastify.requireRole(['admin', 'teacher'])] },
    async (request, reply) => {
      try {
        const { id } = request.params;

        const submissions = await db
          .select({
            id: formSubmissions.id,
            formId: formSubmissions.formId,
            userId: formSubmissions.userId,
            answers: formSubmissions.answers,
            submittedAt: formSubmissions.submittedAt,
            fullName: userProfiles.fullName,
          })
          .from(formSubmissions)
          .leftJoin(userProfiles, eq(formSubmissions.userId, userProfiles.id))
          .where(eq(formSubmissions.formId, id));

        return submissions;
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );
};

export { formsRoutes };