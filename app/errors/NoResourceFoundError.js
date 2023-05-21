/** Class representing a no resource found error. */
class NoResourceFoundError extends Error {
  /**
   * create a no resource found error
   *
   * @augments Error
   */
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.httpStatusCode = 404;
  }
}

module.exports = NoResourceFoundError;
