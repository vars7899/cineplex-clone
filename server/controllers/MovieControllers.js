const Movie = require("../models/Movie");
const asyncHandler = require("express-async-handler");
const { serverError } = require("../error/serverError");

// @desc		add new movie to the data base
// @route		/api/movie/addmovie
// @access		Admin
const addMovie = asyncHandler(async (req, res) => {
  const { name, length, genre, trailer, image } = req.body;
  try {
    const newMovie = await Movie.create({
      name,
      length,
      genre,
      trailer,
      image,
    });
    res.status(200).json({
      _id: newMovie._id,
      name: newMovie.name,
      length: newMovie.length,
      genre: newMovie.genre,
      trailer: newMovie.trailer,
      image: newMovie.image,
    });
  } catch (err) {
    res.status(500);
    throw new Error(serverError("At add movie controller", err));
  }
});

// @desc		update the details of the movie
// @route		/api/movie/editmovie:movieId
// @access	    Admin
const editMovie = asyncHandler(async (req, res) => {
  try {
    const { movieId } = req.params;
    const { name, length, genre, trailer, image } = req.body;

    const movieExisted = await Movie.findById({ _id: movieId });
    if (!movieExisted) {
      res.status(400).json({
        message: "invalid Movie ID, movie was not found",
      });
    }
    const updatedMovie = await Movie.findByIdAndUpdate(
      { _id: movieId },
      {
        name: name ? name : movieExisted.name,
        length: length ? length : movieExisted.length,
        genre: genre ? genre : movieExisted.genre,
        trailer: trailer ? trailer : movieExisted.trailer,
        image: image ? image : movieExisted.image,
      },
      { new: true }
    );
    res.status(200).json({
      _id: updatedMovie._id,
      name: updatedMovie.name,
      length: updatedMovie.length,
      genre: updatedMovie.genre,
      trailer: updatedMovie.trailer,
      image: updatedMovie.image,
    });
  } catch (err) {
    res.status(500);
    throw new Error(serverError("At edit movie controller", err));
  }
});

// @desc		delete the movie with given ID
// @route		/api/movie/deletemovie:movieId
// @access	    Admin
const deleteMovie = asyncHandler(async (req, res) => {
  try {
    const { movieId } = req.params;

    const movieExisted = await Movie.findById({ _id: movieId });
    if (!movieExisted) {
      res.status(400).json({
        message: "invalid Movie ID, movie was not found",
      });
    }
    await Movie.deleteOne({ _id: movieId });
    res.status(200).json({
      _id: movieExisted._id,
      name: movieExisted.name,
      length: movieExisted.length,
      genre: movieExisted.genre,
      trailer: movieExisted.trailer,
      image: movieExisted.image,
    });
  } catch (err) {
    res.status(500);
    throw new Error(serverError("At edit movie controller", err));
  }
});

// @desc		update the details of the movie
// @route		/api/movie/
// @access	    Admin
const getMovies = asyncHandler(async (req, res) => {
  try {
    const movieExisted = await Movie.find({});

    res.status(200).json(movieExisted);
  } catch (err) {
    res.status(500);
    throw new Error(serverError("At edit movie controller", err));
  }
});

module.exports = { addMovie, editMovie, deleteMovie, getMovies };
