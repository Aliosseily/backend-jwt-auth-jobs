const CustomApiError = require("./custom-api");

// class UnauthorizedError extends CustomApiError{
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
