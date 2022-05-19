const asyncHandler = require("express-async-handler");
const { serverError } = require("../error/serverError");
const validEmail = require("../utils/validateEmail");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc		Register a new user after verifying email
// @route		/api/user
// @access		public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // validate the incoming data
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error(serverError("Incomplete User Data"));
  }
  if (!validEmail(email)) {
    res.status(400);
    throw new Error(serverError("Invalid Email"));
  }
  // check if email already registered
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error(serverError("Email already registered"));
  }
  // validate the email of the user
  // create new user
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(200).json({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      token: generateToken(newUser._id),
      message: "User Created successfully",
    });
  } catch (err) {
    res.status(500);
    throw new Error(serverError("Register User"));
  }
});

// @desc			Login user
// @route			/api/user/login
// @access		public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // validate incoming data
  if (!email || !password) {
    res.status(400);
    throw new Error(serverError("Incomplete request"));
  }
  // validate email
  if (!validEmail(email)) {
    res.status(400);
    throw new Error(serverError("Invalid Email Format"));
  }
  try {
    // get the user
    const userExist = await User.findOne({ email });

    if (userExist && (await userExist.matchPassword(password))) {
      res.status(200).json({
        _id: userExist._id,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        email: userExist.email,
        token: generateToken(userExist._id),
        message: "User logged In successfully",
      });
    } else {
      res.status(400);
      throw new Error(serverError("Invalid email or password"));
    }
  } catch (err) {
    res.status(500);
    throw new Error(serverError("Login User"));
  }
});
module.exports = { registerUser, loginUser };

// @desc      forgot password functionality
// @route			/api/user/reset-password
// @access		private
const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // find if the user exist in the DB
  const userExist = await User.findOne({ email });

  if (!userExist) {
    res.send(200).json({
      message: `${email} was not found in our records`,
    });
  }
});
