/**
 * This file includes a function to check if the user has admin rights.
 * @module isAdmin
 * @requires module:../errors/BadRequestError
 */

/**
 * Middleware function to check if the url params are numbres.
 * If the param isn't a number, a BadRequestError is thrown.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 *
 * @throws {BadRequestError} If the param is not a number
 */

const BadRequestError = require('../errors/BadRequestError');

const validateParam = (paramName) => (req, res, next, id) => {
  const idRegex = /^[0-9]+$/;
  if (!idRegex.test(id)) {
    throw new BadRequestError(`Invalid ${paramName}: ${id}. It should be a number.`);
  }
  next();
};

module.exports = validateParam;
