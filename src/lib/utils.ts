import type { Response } from 'express';
import * as z from 'zod';

import { CustomError } from './error';
export function bytesToMegabytes(bytes: number) {
  return bytes / (1024 * 1024);
}

export function zodParse<T extends z.ZodTypeAny>(
  Schema: T,
  inputData: unknown,
): z.infer<T> {
  try {
    const result = Schema.parse(inputData);
    return result as z.infer<T>;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errDetail = {
        message: z.prettifyError(error),
        code: 'invalid_input',
        detail: error,
      };
      throw new CustomError(400, errDetail);
    }
    throw error;
  }
}

export function sendSuccess(
  res: Response,
  status: number,
  body?: Omit<API.Success, 'type'>,
) {
  res.status(status).json({ type: 'success', ...body });
}

export function sendError(
  res: Response,
  status: number,
  body: API.Error['error'],
) {
  res.status(status).json({ type: 'error', error: { ...body } });
}
