class BadRequestError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class TooManyRequests extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 429;
  }
}

module.exports = {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  ConflictError,
  BadRequestError,
  TooManyRequests,
};

