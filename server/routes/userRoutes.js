const router = require("express").Router();
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  getAllUser,
  becomeAdmin,
  getStatics,
} = require("../controllers/UserControllers");

router.route("/").post(registerUser).get(auth, admin, getAllUser);
router.route("/login").post(loginUser);
// router.route("/reset-password").post(resetPassword)
router.route("/status/:userId").put(auth, becomeAdmin);
router.route("/statics").get(auth, admin, getStatics);
module.exports = router;
