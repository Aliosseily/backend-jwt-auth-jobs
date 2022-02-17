const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong try again later",
  };
  // if required field not sent, err.name === 'ValidationError' sent by mongoose
  //Object.values(err.errors) return array of errors [{},{}]
  if (err.name === "ValidationError") {
    customError.msg = customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  // if duplicate email, err.code === 11000 sent by mongoose
  if (err.code && err.code === 11000) {
    // ${Object.keys(err.keyValue) = ${err.keyValue.email}
    // ${Object.keys(err.keyValue) ['email']
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  // if id sent not follow mongoose structure (length of id less or greater than )
  if (err.name === "CastError") {
    customError.msg = err.valueType === "string"
      ? `No item found with id : ${err.value}`
      : `No item found with id : ${err.value._id}`;
    customError.statusCode = 404;
  }

   return res.status(customError.statusCode).json({ msg: customError.msg });
  // return res.json({ err });
};

module.exports = errorHandlerMiddleware;

// if error is instance of CustomApiError, then send error.
// but there are cases we want to send validation error, duplicate entered emmail error, cast error
// comming from mongoose, so wen use the error handle above to send only the message of error not the whole object
// const  CustomApiError  = require('../errors/custom-api')
// // const { StatusCodes } = require('http-status-codes')
// const errorHandlerMiddleware = (err, req, res, next) => {
// //  kermeil hik 5ala2na CustomApiError 3ashen fe 3ena 3 classes extends menno,
// // eza ma 3melna hik beseer badna nshayek :
// // if err instanceof UnauthorizedError ||
// // if err instanceof BadRequestError  ||
// // if err NotFoundError UnauthorizedError
//   if (err instanceof CustomApiError) {
//     return res.status(err.statusCode).json({ msg: err.message })
//   }
//   return res.status(500).json({ err })
// }

//  module.exports = errorHandlerMiddleware
