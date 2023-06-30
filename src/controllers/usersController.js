const { AppError, LoginError, UnauthorizedError } = require("../helpers");

const { signToken } = require("../services/signToken");

const {
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../services/usersService");

const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await loginUser(email, password);

  if (user) {
    const { _id, email } = user;

    const token = signToken(_id);

    user.token = token;

    await user.save();

    return res.status(200).json({
      token,
      user: { email },
    });
  } else {
    return next(new LoginError());
  }
};

const logoutUserController = async (req, res, next) => {
  const { _id } = req.user;

  const user = await logoutUser(_id);

  if (user) {
    user.token = undefined;
    user.save();
    return res.status(204).send();
  } else {
    return next(new UnauthorizedError());
  }
};

const currentUserController = async (req, res, next) => {
  const { _id } = req.user;

  const user = await getCurrentUser(_id);

  if (user) {
    const { email } = user;

    return res.status(200).json({
      email,
    });
  } else {
    return next(new UnauthorizedError());
  }
};

module.exports = {
  loginUserController,
  logoutUserController,
  currentUserController,
};
