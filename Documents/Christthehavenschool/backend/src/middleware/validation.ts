import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';

// Rate limiting middleware (simplified implementation)
export const rateLimit = (maxRequests: number, windowMs: number) => {
  const requests: Map<string, { count: number; resetTime: number }> = new Map();

  return (req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction) => {
    const ip = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;

    const requestInfo = requests.get(ip) || { count: 0, resetTime: now + windowMs };

    if (requestInfo.resetTime < now) {
      // Reset window
      requestInfo.count = 1;
      requestInfo.resetTime = now + windowMs;
    } else {
      requestInfo.count++;
    }

    requests.set(ip, requestInfo);

    if (requestInfo.count > maxRequests) {
      return res.status(429).send({ error: 'Too many requests, please try again later.' });
    }

    done();
  };
};

// Input sanitization middleware
export const sanitizeInput = (input: any): any => {
  if (typeof input === 'string') {
    // Basic XSS prevention - remove script tags and other potentially dangerous content
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  } else if (Array.isArray(input)) {
    return input.map(item => sanitizeInput(item));
  } else if (typeof input === 'object' && input !== null) {
    const sanitized: any = {};
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        sanitized[key] = sanitizeInput(input[key]);
      }
    }
    return sanitized;
  }
  return input;
};

// Validation middleware using Zod
import { ZodSchema } from 'zod';

export const validateWithZod = (schema: ZodSchema) => {
  return async (req: FastifyRequest) => {
    try {
      const parsedData = schema.parse(req.body);
      req.body = parsedData;
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: 'Validation failed',
          details: error.errors || []
        }
      };
    }
  };
};