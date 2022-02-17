const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  console.log("HEAD",req.headers)
  console.log("BODY",req.body)
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("payload",payload.userId)

    req.user = { userId: payload.userId, name: payload.name }; // send user object to next midlleware, (to controller function)
    next();
  } catch (error) {
    throw new UnauthorizedError("Authentication invalid");
  }
};

module.exports = auth;
