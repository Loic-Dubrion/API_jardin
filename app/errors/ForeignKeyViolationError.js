/** Class representing a violation foreign key error. */
class ForeignKeyViolationError extends Error {
  /**
   * create a violation foreign key error
   *
   * @augments Error
   */
  constructor(message) {
    super(message);
    this.name = 'ForeignKeyViolationError';
    this.httpStatusCode = 400;
  }
}

module.exports = ForeignKeyViolationError;
