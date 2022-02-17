const User = require("../module/User");
// const UnauthorizedError = require("../errors/unauthorized");
// const NotFoundError = require("../errors/not-found");
// const BadRequestError = require("../errors/bad-request");
const {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

// instead of writng try catch manually in every function, we use express-async-errors libaray
// to add try catch for every async function
// const register = async (req, res, next) => {
//   try{
//     const user = await User.create(req.body);
//     res.status(201).json({ user });
//   }
//   catch(error){
//       next(error)
//   }
// };

const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  // return res.status(201).json({ user: { name: user.name }, token });
  return res.status(201).json({ user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email | !password) {
    throw new BadRequestError("please enter email and password");
    // return res.status(400).send("please enter email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("user not found!");
    // return res.status(404).send("user not found!");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthorizedError("unauthorized");
    // return res.status(401).send("unauthorized");
  }
  const token = user.createJWT();
  return res.status(200).send({ user, token });
};

module.exports = { register, login };
