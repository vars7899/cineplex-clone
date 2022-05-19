const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is a required field"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email is a required field"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is a required field"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
UserSchema.methods.matchPassword = async function (givenPass) {
  return await bcrypt.compare(givenPass, this.password);
};
UserSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified) {
    next();
  }
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
