const NoResourceFoundError = require('./NoResourceFoundError');
const ForeignKeyViolationError = require('./ForeignKeyViolationError');
const ForbiddenError = require('./ForbiddenError');
const BadRequestError = require('./BadRequestError');
const UniqueConstraintViolationError = require('./UniqueConstraintViolationError');
const UnauthorizedError = require('./UnauthorizedError');
const logger = require('../services/logger');

/**
 * Middleware for handling errors in API calls.
 *
 * @param {Error} err - The error to handle.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
function apiErrorHandler(err, __req, res) {
  logger.error(err);
  if (
    err instanceof NoResourceFoundError
    || err instanceof ForeignKeyViolationError
    || err instanceof ForbiddenError
    || err instanceof BadRequestError
    || err instanceof UniqueConstraintViolationError
    || err instanceof UnauthorizedError
  ) {
    res.status(err.httpStatusCode).json({
      httpCode: err.httpStatusCode,
      status: 'error',
      message: err.message,
    });
  } else {
    res.status(500).json({
      httpCode: 500,
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}

module.exports = apiErrorHandler;
