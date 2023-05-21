const ForeignKeyViolationError = require('../../errors/ForeignKeyViolationError');
const BadRequestError = require('../../errors/BadRequestError');
/**
 * Factory returning a controller with error handling
 *
 * @param {function} controller - a middleware controller
 * @returns {function} a middleware controller with error management
 */
function controllerHandler(controller) {
  return async (request, response, next) => {
    try {
      await controller(request, response, next);
    } catch (err) {
      let error = err;
      if (err.code === '23503') {
        error = new ForeignKeyViolationError('Cannot delete a record with associated entries');
      } else if (err.code === '23502') {
        error = new BadRequestError(`Bad Request, ${error.column} can't be Null`);
      } else if (err.code === '23505') {
        error = new BadRequestError(`Bad Request, ${error.detail}`);
      }
      next(error);
    }
  };
}

module.exports = controllerHandler;
