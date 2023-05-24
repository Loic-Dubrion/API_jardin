/**
 * This file includes a function to check if the user has admin rights.
 * @module isAdmin
 * @requires module:../errors/ForbiddenError
 */

const ForbiddenError = require('../errors/ForbiddenError');

/**
 * Middleware function to check if the user is an admin.
 * If the user is not logged in, a ForbiddenError is thrown.
 * If the user is logged in but does not have admin rights (role !== 1), a ForbiddenError is thrown.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 *
 * @throws {ForbiddenError} If the user is not logged in or does not have admin rights
 */
const isAdmin = (req, res, next) => {
  if (!req.session.user) {
    throw new ForbiddenError('no access - you do not have the necessary rights');
  }

  if (req.session.user.role !== 1) {
    throw new ForbiddenError('no access - you do not have the necessary rights');
  }

  next();
};

module.exports = isAdmin;
