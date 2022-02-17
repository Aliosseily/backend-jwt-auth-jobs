const CustomApiError = require("./custom-api");

// class NotFoundError extends CustomApiError{
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
