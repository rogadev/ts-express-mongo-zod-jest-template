import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import ErrorResponse from './interfaces/ErrorResponse';
import RequestValidators from './interfaces/RequestValidators';

// Validates the request body against the provided Zod schema(s).
export function validateRequest(validators: RequestValidators) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { body, params, query } = validators;

    try {
      if (params) {
        req.params = await params.parseAsync(req.params);
      }
      if (body) {
        req.body = await body.parseAsync(req.body);
      }
      if (query) {
        req.query = await query.parseAsync(req.query);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422); //422 Unprocessable Entity
      }
      next(error);
    }
  };
}

// Not found middleware.
export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404); // 404 Not Found
  const error = new Error(`Error. ${req.originalUrl} not found.`);
  next(error);
}

// Error handler middleware.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  // If we're getting a 200 from the response, but we're handling an error, send back a 500 error.
  const statusCode: number = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}