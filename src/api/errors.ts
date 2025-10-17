import { AxiosError } from 'axios';

export class BadRequestError extends Error {
  status = 400;

  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends Error {
  status = 401;

  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  status = 403;

  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends Error {
  status = 404;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ServerError extends Error {
  status = 500;

  constructor(message: string) {
    super(message);
    this.name = 'ServerError';
  }
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }

  static fromResponse(response: AxiosError) {
    if (response.status === 400) {
      return new BadRequestError(response.message);
    }

    if (response.status === 401) {
      return new UnauthorizedError(response.message);
    }

    if (response.status === 403) {
      return new ForbiddenError(response.message);
    }

    if (response.status === 404) {
      return new NotFoundError(response.message);
    }

    if (response.status) {
      return new ApiError(response.message, response.status);
    }

    return new ServerError(response.message);
  }
}
