const NoResourceFoundError = require('./NoResourceFoundError');
const ForeignKeyViolationError = require('./ForeignKeyViolationError');
const BadRequestError = require('./BadRequestError');
const UniqueConstraintViolationError = require('./UniqueConstraintViolationError');

/**
 * Middleware for handling errors in API calls.
 *
 * @param {Error} err - The error to handle.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
function apiErrorHandler(err, __req, res) {
  if (
    err instanceof NoResourceFoundError
    || err instanceof ForeignKeyViolationError
    || err instanceof BadRequestError
    || err instanceof UniqueConstraintViolationError
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
