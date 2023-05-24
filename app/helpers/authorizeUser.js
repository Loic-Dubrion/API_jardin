/**
 * This file includes a function to limit access to other users' routes
 * @module authorizeUser
 * @requires module:../errors/ForbiddenError
 */

/**
 * Middleware for authorizing users.
 * Checks if the user session exists and if the session user id matches the user id in the request parameters.
 * @param {Object} req - The request object coming from the client
 * @param {Object} res - The response object going to the client
 * @param {function} next - The callback to the next program handler
 * @throws {ForbiddenError} - error 403
 */
// eslint-disable-next-line consistent-return
const ForbiddenError = require('../errors/ForbiddenError');

const authorizeUser = (req, res, next) => {
  const userId = Number(req.params.userId);

  if (!req.session.user) {
    throw new ForbiddenError('Incorrect user or password');
  }

  if (userId && userId !== req.session.user.id) {
    throw new ForbiddenError('Incorrect user or password');
  }

  next();
};

module.exports = authorizeUser;
