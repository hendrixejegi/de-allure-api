import type { NextFunction, Request, Response } from 'express';

import config from '../config';
import { CustomError, getErrorMessage } from '../lib/error';
import { sendError } from '../lib/utils';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // If headers already sent, delegate to default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  // Log in development
  if (config.nodeEnv === 'development') {
    console.error('Error:', err.message);
  }

  // Handle CustomError
  if (err instanceof CustomError) {
    return sendError(res, err.status, err.body);
  }

  sendError(res, 500, {
    message: getErrorMessage(err) || 'Internal server error',
  });
};
