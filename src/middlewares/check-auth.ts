import type { NextFunction, Request, Response } from 'express';

import { auth } from '../lib/auth';
import { CustomError } from '../lib/error';

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const headers = req.headers;

  const session = await auth.api.getSession({ headers });

  if (!session) {
    throw new CustomError({
      code: 'UNAUTHORIZED',
      status: 401,
      message: 'Missing or invalid authentication credentials',
    });
  }

  req.userId = session.user.id;

  next();
}
