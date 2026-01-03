import { FastifyPluginAsync } from 'fastify';
import { studentRoutes } from './students';
import { authRoutes } from './auth';
import { formRoutes } from './forms';
import { classRoutes } from './classes';

const routes: FastifyPluginAsync = async (fastify) => {
  // Register all route plugins
  fastify.register(studentRoutes);
  fastify.register(authRoutes);
  fastify.register(formRoutes);
  fastify.register(classRoutes);
};

export { routes };