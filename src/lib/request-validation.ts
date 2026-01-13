import type { Request } from 'express';

import { CustomError } from './error';

type ValidateRequestResult = {
  isValid: boolean;
  missing: string[];
  unexpected: string[];
};

export function validateObject(obj: unknown, R: string[], O: string[] = []) {
  const missing: string[] = [];
  const unexpected: string[] = [];

  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return {
      isValid: false,
      missing: R,
      unexpected: [],
    };
  }

  const record = obj as Record<string, unknown>;
  const keys = Object.keys(record);

  // Check for missing required fields
  for (const key of R) {
    if (!(key in record)) {
      missing.push(key);
    }
  }

  // Check for unexpected fields
  for (const key of keys) {
    if (!R.includes(key) && !O.includes(key)) {
      unexpected.push(key);
    }
  }

  return {
    isValid: missing.length === 0 && unexpected.length === 0,
    missing,
    unexpected,
  };
}

/**
 *
 * @param req Route handler request object
 * @param R Required keys in `request.body`
 * @param O Optional keys in `request.body`
 * @returns
 */
export function validateRequestBody(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: Request<object, object, any>,
  R: string[],
  O: string[] = [],
) {
  return validateObject(req.body, R, O);
}

/**
 *
 * @param req Route handler request object
 * @param R Required keys in `request.params`
 * @param O Optional keys in `request.params`
 * @returns
 */
export function validateRequestParams(
  req: Request,
  R: string[],
  O: string[] = [],
) {
  return validateObject(req.params, R, O);
}

export function checkValidateRequestResult(result: ValidateRequestResult) {
  if (!result.isValid) {
    if (result.missing.length > 0) {
      throw new CustomError({
        code: 'BAD_REQUEST',
        status: 400,
        message: 'Missing Fields',
        data: {
          missing: result.missing,
        },
      });
    }

    if (result.unexpected.length > 0) {
      throw new CustomError({
        code: 'BAD_REQUEST',
        status: 400,
        message: 'Unexpected Fields',
        data: {
          unexpected: result.unexpected,
        },
      });
    }
  }

  return true;
}
