/** Class representing an Unauthorized error. */
class UnauthorizedError extends Error {
  /**
   * Create an Unauthorized error
   *
   * @augments Error
   */
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.httpStatusCode = 401;
  }
}

module.exports = UnauthorizedError;
