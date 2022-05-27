const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
  },
});
const TicketSchema = new mongoose.Schema(
  {
    seats: [
      {
        type: String,
        required: true,
      },
    ],
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
      // required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      // required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    serviceCharge: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
      required: true,
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", TicketSchema);
module.exports = Ticket;
