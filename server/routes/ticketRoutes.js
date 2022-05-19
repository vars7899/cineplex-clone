const router = require("express").Router();
const auth = require("../middleware/auth");
const { createNewTicket } = require("../controllers/TicketControllers");

// Create Movie Ticket
router.route("/").post(auth, createNewTicket);

module.exports = router;
