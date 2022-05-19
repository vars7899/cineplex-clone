const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const colors = require("colors");

const auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById({ _id: decoded._id }).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error(colors.red("Not Authorized, TOKEN invalid"));
    }
  }
  if (!token) {
    res.status(401);
    throw new Error(colors.red("Not Authorized, no TOKEN"));
  }
});

module.exports = auth;
