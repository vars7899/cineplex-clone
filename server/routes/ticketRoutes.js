const router = require("express").Router();
const express = require("express");
const auth = require("../middleware/auth");
const {
  createNewTicket,
  generatePaymentUrl,
} = require("../controllers/TicketControllers");

// Create Movie Ticket
router.route("/").post(auth, generatePaymentUrl);

router.post(
  "/success",
  express.raw({ type: "application/json" }),
  createNewTicket
);

module.exports = router;
