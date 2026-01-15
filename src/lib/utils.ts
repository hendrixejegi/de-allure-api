import * as z from 'zod';

import { CustomError } from './error';
export function bytesToMegabytes(bytes: number) {
  return bytes / (1024 * 1024);
}

export function zodValidate(schema: z.ZodType, args: any) {
  const result = schema.safeParse(args);

  if (!result.success) {
    const flat = z.flattenError(result.error);

    throw new CustomError({
      code: 'INVALID_INPUT',
      status: 400,
      message: 'Incorrect fields',
      data: flat.fieldErrors,
    });
  }
}
