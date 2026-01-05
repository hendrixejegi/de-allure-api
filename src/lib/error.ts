export class CustomError extends Error {
  code: string;
  status: number;

  constructor(code: string, status: number, message: string) {
    super();
    this.code = code;
    this.status = status;
    this.message = message;
  }
}

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
