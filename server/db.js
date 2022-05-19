const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  try {
    const DB = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(
      colors.bgGreen.black(` mongoDB connected: ${DB.connection.host} `)
    );
  } catch (err) {
    console.log(colors.red(err));
  }
};

module.exports = connectDB;
