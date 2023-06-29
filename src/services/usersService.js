const { User } = require("../models/userModel");

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (user) {
    return password === user.password ? user : null;
  }

  return user;
};

const logoutUser = async (id) => {
  const user = await User.findOne({ _id: id });

  return user;
};

const getCurrentUser = async (id) => {
  const user = await User.findOne({ _id: id });

  return user;
};

module.exports = {
  loginUser,
  logoutUser,
  getCurrentUser,
};
