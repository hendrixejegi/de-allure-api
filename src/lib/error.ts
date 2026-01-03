export class CustomError extends Error {
  status: string;
  statusCode: number;

  constructor(status: string, statusCode: number, message: string) {
    super();
    this.status = status;
    this.statusCode = statusCode;
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
