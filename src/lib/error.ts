export class CustomError<T = unknown> extends Error {
  code: string;
  status: number;
  data?: T | undefined;

  constructor({
    code,
    status,
    message,
    data,
  }: {
    code: 'BAD_REQUEST' | 'UNAUTHORIZED' | 'SERVER_ERROR' | 'NOT_FOUND';
    status: number;
    message: string;
    data?: T;
  }) {
    super(message);
    this.code = code;
    this.status = status;
    this.data = data;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getErrorMessage(err: any): string | null {
  if (typeof err === 'object' && 'message' in err) {
    return err.message;
  }

  if (err instanceof CustomError) {
    return err.message;
  }

  if (typeof err === 'string') {
    return err;
  }

  return null;
}
