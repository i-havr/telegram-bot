const { AppError, LoginError, UnauthorizedError } = require("../helpers");

const { signToken } = require("../services/signToken");

const {
  loginUser,
  logoutUser,
  getCurrentUser,
  verifyUserByToken,
} = require("../services/usersService");

const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await loginUser(email, password);

  if (user) {
    const { _id, email, subscription } = user;

    const token = signToken(_id);

    user.token = token;

    await user.save();

    return res.status(200).json({
      token,
      user: { email, subscription },
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

const verifyUserByTokenController = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await verifyUserByToken(verificationToken);

  if (user) {
    user.verify = true;
    user.verificationToken = null;

    await user.save();

    return res.status(200).json({
      message: "Verification successful",
    });
  } else {
    return next(new AppError(404, "User not found"));
  }
};

module.exports = {
  loginUserController,
  logoutUserController,
  currentUserController,
  verifyUserByTokenController,
};
