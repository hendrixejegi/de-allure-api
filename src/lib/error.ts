export class CustomError extends Error {
  code: string;
  status: number;

  constructor({
    code,
    status,
    message,
  }: {
    code: string;
    status: number;
    message: string;
  }) {
    super();
    this.code = code;
    this.status = status;
    this.message = message;
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
