/** Class representing a bad request error. */
class BadRequestError extends Error {
  /**
   * Create a bad request error
   *
   * @augments Error
   */
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.httpStatusCode = 400;
  }
}

module.exports = BadRequestError;
