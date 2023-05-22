/** Class representing a forbidden error. */
class ForbiddenError extends Error {
  /**
   * Create a forbidden error
   *
   * @augments Error
   */
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.httpStatusCode = 403;
  }
}

module.exports = ForbiddenError;
