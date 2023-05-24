/**
 * This file includes a function to check if users are logged in
 * @module authentification
 */

/**
 * Auth middleware checks the user session, if it exists,
 * sets the local user to the session user. If not, sets it to false.
 * @param {Object} req - The request object coming from the client
 * @param {Object} res - The response object going to the client
 * @param {function} next - The callback to the next program handler
 */

const auth = (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  } else {
    res.locals.user = false;
  }

  next();
};

module.exports = auth;
