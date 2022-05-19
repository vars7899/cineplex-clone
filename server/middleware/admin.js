const asyncHandler = require("express-async-handler");

const admin = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new Error(colors.red("Not Authorized"));
  }
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error(colors.red("Not Authorized as Admin"));
  }
});

module.exports = admin;
