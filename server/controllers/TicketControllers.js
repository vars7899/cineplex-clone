const asyncHandler = require("express-async-handler");
const { serverError } = require("../error/serverError");
const stripe = require("stripe")();
const Ticket = require("../models/Ticket");

// @desc		Create new ticket
// @route		/api/ticket
// @access		Private
const createNewTicket = asyncHandler(async (req, res) => {
  const {
    theatreId,
    movieId,
    time,
    date,
    seats,
    total,
    serviceCharge,
    tax,
    subTotal,
  } = req.body;
  try {
    console.log(parseFloat(total));
    const session = await stripe.checkout.sessions.create(
      {
        line_items: [
          {
            price_data: {
              currency: "cad",
              product_data: {
                name: "Cineplex ticket",
              },
              unit_amount: parseInt(total * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.CLIENT_DOMAIN}/`,
        cancel_url: `${process.env.CLIENT_DOMAIN}/theaters`,
      },
      {
        apiKey: process.env.STRIPE_SECRET,
      }
    );

    res.json({ url: session.url });
    // let newTicket = await Ticket.create({
    //   seats: seats,
    //   theatre: theatreId,
    //   movie: movieId,
    //   date: date,
    //   time: time,
    //   total: total,
    //   serviceCharge: serviceCharge,
    //   tax: tax,
    //   subTotal: subTotal,
    // });
    // newTicket = await newTicket.populate("movie");
    // newTicket = await newTicket.populate("theatre");
    // res.status(200).json({
    //   seats: newTicket.seats,
    //   theatre: newTicket.theatre,
    //   movie: newTicket.movie,
    //   date: newTicket.date,
    //   time: newTicket.time,
    //   total: newTicket.total,
    //   serviceCharge: newTicket.serviceCharge,
    //   tax: newTicket.tax,
    //   subTotal: newTicket.subTotal,
    // });
  } catch (err) {
    res.status(500);
    throw new Error(serverError(`${err},  Request to create ticket failed`));
  }
});

module.exports = { createNewTicket };
