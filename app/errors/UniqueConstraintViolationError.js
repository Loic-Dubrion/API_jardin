/** Class representing a unique constraint violation error. */
class UniqueConstraintViolationError extends Error {
  /**
   * Create a unique constraint violation error.
   *
   * @augments Error
   */
  constructor(message) {
    super(message);
    this.name = 'UniqueConstraintViolationError';
    this.httpStatusCode = 409;
  }
}

module.exports = UniqueConstraintViolationError;
