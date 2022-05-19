const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/UserControllers");

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
// router.route("/reset-password").post(resetPassword)
module.exports = router;
