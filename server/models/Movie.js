const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill in the movie name"],
  },
  runtime: {
    type: String,
    required: [true, "Please fill int the movie length"],
  },
  genre: {
    type: String,
    required: [true, "Please fill int the movie genre"],
  },
  trailer: {
    type: String,
    required: [true, "Please fill int the movie trailer"],
  },
  image: {
    type: String,
    required: [true, "Movie Image is a required Field"],
  },
  director: {
    type: String,
    required: [true, "Movie Image is a required Field"],
  },
  desc: {
    type: String,
    required: [true, "Movie Image is a required Field"],
  },
  cast: [
    {
      type: String,
    },
  ],
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
