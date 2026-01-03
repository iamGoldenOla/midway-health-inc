import { FastifyPluginAsync } from 'fastify';
import { db } from '../database';

export const databasePlugin: FastifyPluginAsync = async (fastify) => {
  // Register the database instance
  fastify.decorate('db', db);

  // Close database connection when server closes
  fastify.addHook('onClose', async (instance) => {
    // In this case, we're using pg.Pool which handles connection lifecycle
    // The actual cleanup would happen in the pool's close method if needed
  });
};