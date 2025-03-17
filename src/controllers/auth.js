const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { responseHandler } = require("../utils/responseHandler");
const { RESPONSE_MESSAGES } = require("../utils/constants");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user)
      return responseHandler(
        res,
        400,
        false,
        RESPONSE_MESSAGES.USER_ALREADY_EXISTS
      );

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    responseHandler(res, 201, true, RESPONSE_MESSAGES.USER_REGISTERED_SUCCESS, {
      token,
      userId: user._id,
      name: user.name,
    });
  } catch (error) {
    responseHandler(
      res,
      500,
      false,
      RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return responseHandler(
        res,
        400,
        false,
        RESPONSE_MESSAGES.INVALID_CREDENTIALS
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return responseHandler(
        res,
        400,
        false,
        RESPONSE_MESSAGES.INVALID_CREDENTIALS
      );

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    responseHandler(res, 200, true, RESPONSE_MESSAGES.LOGIN_SUCCESS, {
      token,
      userId: user._id,
      name: user.name,
    });
  } catch (error) {
    responseHandler(
      res,
      500,
      false,
      RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

module.exports = { registerUser, loginUser };
