/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }

  namespace API {
    interface Error {
      type: 'error';
      error: {
        message: string;
        code?: string;
        data?: unknown;
      };
    }

    interface Meta {
      page?: number;
      pageSize?: number;
      total?: number;
    }

    interface Success {
      type: 'success';
      message?: string;
      data?: unknown;
      meta?: APIMeta;
    }

    type APIResponse = Error | Success;
  }
}
