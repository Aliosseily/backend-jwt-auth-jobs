//this file only to gather all errors in one file.

const UnauthorizedError = require("../errors/unauthorized");
const NotFoundError = require("../errors/not-found");
const BadRequestError = require("../errors/bad-request"); 

module.exports = {
    UnauthorizedError,
    NotFoundError,
    BadRequestError,
}