const NoResourceFoundError = require('./NoResourceFoundError');
/**
 * Middleware of error management for API calls.
 *
 * @param {Error} err - The error to manage.
 * @param {import('express').Request} req - request object.
 * @param {import('express').Response} res - response object.
 */
function apiErrorHandler(err, __req, res) {
  if (err instanceof NoResourceFoundError) {
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
