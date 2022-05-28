const asyncHandler = require("express-async-handler");
const { serverError } = require("../error/serverError");
const Ticket = require("../models/Ticket");
const stripe = require("stripe")();
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

// @desc		Create new ticket
// @route		/api/ticket
// @access		Private
const generatePaymentUrl = asyncHandler(async (req, res) => {
  const {
    user,
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
      user: user,
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
    res.json({ url: session.url, newTicket });
  } catch (err) {
    res.status(500);
    throw new Error(serverError(`${err}, Stripe failed`));
  }
});

const createNewTicket = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.data.object.status === "succeeded") {
      let ticket = await Ticket.findOneAndUpdate(
        { paymentId: event.data.object.payment_intent },
        { paid: true },
        { new: true }
      );
      ticket = await ticket.populate("movie");
      ticket = await ticket.populate("theatre");
      ticket = await ticket.populate("user", "-password");

      // Send Ticket to Email
      var transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: "ticket7899@outlook.com",
          pass: "E:j5hYL5UkJ9!vx",
        },
      });
      const handlebarOptions = {
        viewEngine: {
          extName: ".handlebars",
          partialsDir: path.resolve("./template"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./server/template"),
        extName: ".handlebars",
      };
      transporter.use("compile", hbs(handlebarOptions));
      console.log(event);
      var mailOptions = {
        from: "ticket7899@outlook.com",
        to: " jbenjaminbj4@gmail.com",
        subject: "Cineplex Ticket",
        template: "ticket",
        context: {
          orderId: ticket._id,
          firstName: ticket.user.firstName,
          lastName: ticket.user.lastName,
          email: ticket.user.email,
          createdAt: ticket.user.createdAt,
          movieName: ticket.movie.name,
          runtime: ticket.movie.runtime,
          theatreName: ticket.theatre.name,
          theatreAddress: ticket.theatre.address,
          theatreCity: ticket.theatre.city,
          theatrePostalCode: ticket.theatre.postalCode,
          theatreCountry: ticket.theatre.country,
          subTotal: ticket.subTotal,
          serviceCharge: ticket.serviceCharge,
          tax: ticket.tax,
          total: ticket.total,
          seats: ticket.seats,
          event: `${event.data.object.receipt_url}`,
          ticket: ticket,
        },
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  res.sendStatus(200);
});

module.exports = { createNewTicket, generatePaymentUrl };
