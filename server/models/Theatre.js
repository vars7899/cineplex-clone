const mongoose = require("mongoose");

const TheatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please fill in the theatre name"],
      maxlength: [
        60,
        "Theatre name should be less than equal to 60 characters in length",
      ],
    },
    address: {
      type: String,
      required: [true, "Please fill in the theatre address"],
    },
    city: {
      type: String,
      required: [true, "Please fill in the theatre city"],
    },
    postalCode: {
      type: String,
      required: [true, "Please fill in the theatre postal code"],
    },
    country: {
      type: String,
      required: [true, "Please fill in the theatre country"],
    },
    timing: [
      {
        type: String,
        default: "00:00",
      },
    ],
    lat: {
      type: String,
      default: "0.000",
    },
    long: {
      type: String,
      default: "0.000",
    },
  },
  {
    timestamps: true,
  }
);

const Theatre = mongoose.model("Theatre", TheatreSchema);
module.exports = Theatre;
