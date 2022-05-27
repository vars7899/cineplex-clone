const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./db.js");
const userRoutes = require("./routes/userRoutes");
const theatreRoutes = require("./routes/theatreRoutes");
const movieRoutes = require("./routes/movieRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const { createNewTicket } = require("./controllers/TicketControllers.js");

dotenv.config();
const app = express();
// app.use(express.json());

// Only use the raw bodyParser for webhooks (Important for STRIPE)
app.use((req, res, next) => {
  if (req.originalUrl === "/api/ticket/success") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// connect Database
connectDB();

// Base route
app.get("/", (req, res) => {
  res.status(200).json({
    server: "Laxman",
    message: "Welcome to Cineplex clone server",
    version: "1.0.0",
  });
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/theatre", theatreRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/ticket", ticketRoutes);

// app.post(
//   "/api/ticket/success",
//   express.raw({ type: "application/json" }),
//   createNewTicket
// );

// server live
app.listen(process.env.PORT, () => {
  console.log(colors.green(`\nServer is UP on PORT ${process.env.PORT}`));
  console.log(
    colors.trap("Visit"),
    colors.blue.underline(`http://localhost:5000/`)
  );
});
