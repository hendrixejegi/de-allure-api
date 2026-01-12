import type { NextFunction, Request, Response } from 'express';

import config from '../config';
import { CustomError, getErrorMessage } from '../lib/error';
import type { ApiResponse } from '../types/api';

export const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction,
) => {
  // If headers already sent, delegate to default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  // Log in development
  if (config.nodeEnv === 'development') {
    console.error('Error:', err);
  }

  // Handle CustomError
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      success: false,
      error: err.code,
      message: err.message,
      data: err.data,
    });
  }

  // Handle all other errors
  return res.status(500).json({
    success: false,
    error: 'INTERNAL_SERVER_ERROR',
    message: getErrorMessage(err) || 'Internal Server Error',
  });
};
