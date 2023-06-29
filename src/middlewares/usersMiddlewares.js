const jwt = require("jsonwebtoken");

const { User } = require("../models/userModel");

const { AppError, UnauthorizedError, validateUserData } = require("../helpers");

const checkLoginData = async (req, _, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(new AppError(400, "missing required [email] field"));
  } else if (!password) {
    return next(new AppError(400, "missing required [password] field"));
  }

  next();
};

const checkToken = async (req, _, next) => {
  const [tokenType, token] = req.headers.authorization?.split(" ");

  if (!token || tokenType !== "Bearer") {
    return next(new UnauthorizedError());
  }

  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);

    if (userData) {
      const { id } = userData;

      const user = await User.findById(id).select({
        __v: 0,
        token: 0,
        password: 0,
      });

      req.user = user;
      next();
    } else {
      req.token = null;
      return next(new UnauthorizedError());
    }
  } catch (error) {
    return next(new UnauthorizedError());
  }
};

module.exports = {
  checkLoginData,
  checkToken,
};
