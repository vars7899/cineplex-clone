const asyncHandler = require("express-async-handler");
const { serverError } = require("../error/serverError");
const Ticket = require("../models/Ticket");
const stripe = require("stripe")();

// @desc		Create new ticket
// @route		/api/ticket
// @access		Private
const generatePaymentUrl = asyncHandler(async (req, res) => {
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
    let newTicket = await Ticket.create({
      seats: seats,
      theatre: theatreId,
      movie: movieId,
      date: date,
      time: time,
      total: total,
      serviceCharge: serviceCharge,
      tax: tax,
      subTotal: subTotal,
      paymentId: session?.payment_intent,
    });
    newTicket = await newTicket.populate("movie");
    newTicket = await newTicket.populate("theatre");
    console.log(session);
    res.json({ url: session.url, newTicket });
  } catch (err) {
    res.status(500);
    throw new Error(serverError(`${err}, Stripe failed`));
  }
});

const createNewTicket = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log(event);

    if (event.data.object.status === "succeeded") {
      const ticket = await Ticket.findOneAndUpdate(
        { paymentId: event.data.object.payment_intent },
        { paid: true },
        { new: true }
      );
      console.log(ticket);
      // console.log(event.data.object.payment_intent);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  console.log(`Unhandled event type ${event.type}`);

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

module.exports = { createNewTicket, generatePaymentUrl };
