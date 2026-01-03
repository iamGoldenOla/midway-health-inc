import Fastify from 'fastify';
import { env } from './config/env';
import { databasePlugin } from './plugins/database';
import { authPlugin } from './plugins/auth';
import { corsPlugin } from './plugins/cors';
import { routes } from './routes';
import { swaggerPlugin } from './plugins/swagger';

const server = Fastify({
  logger: {
    level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  },
});

// Register plugins
server.register(corsPlugin);
server.register(swaggerPlugin);
server.register(databasePlugin);
server.register(authPlugin);

// Register routes
server.register(routes, { prefix: '/api/v1' });

// Health check endpoint
server.get('/health', async () => {
  return { status: 'OK', timestamp: new Date().toISOString() };
});

// Start the server
const start = async () => {
  try {
    await server.listen({ port: env.PORT, host: '0.0.0.0' });
    server.log.info(`Server running on port ${env.PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

export { server };