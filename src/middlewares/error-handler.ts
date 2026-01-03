import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from '../types/api';
import { CustomError, getErrorMessage } from '../lib/error';
import config from '../config/config';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction,
) => {
  if (res.headersSent || config.nodeEnv === 'development') {
    next(err);
  }

  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ success: false, error: err.status, message: err.message });
  }

  res.status(500).json({
    success: false,
    error: 'Server Error',
    message: getErrorMessage(err) || 'Internal Server Error',
  });
};
