export class CustomError extends Error {
  status: number;
  body: API.Error['error'];

  constructor(status: number, body: API.Error['error']) {
    super();
    this.status = status;
    this.body = body;
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
