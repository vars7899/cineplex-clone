const Movie = require("../models/Movie");
const asyncHandler = require("express-async-handler");
const { serverError } = require("../error/serverError");

// @desc		add new movie to the data base
// @route		/api/movie/addmovie
// @access		Admin
const addMovie = asyncHandler(async (req, res) => {
  const { name, runtime, genre, trailer, image, cast, director, desc } =
    req.body;
  try {
    const newMovie = await Movie.create({
      name,
      runtime,
      genre,
      trailer,
      image,
      cast,
      director,
      desc,
    });
    res.status(200).json({
      _id: newMovie._id,
      name: newMovie.name,
      runtime: newMovie.runtime,
      genre: newMovie.genre,
      trailer: newMovie.trailer,
      image: newMovie.image,
      cast: newMovie.cast,
      director: newMovie.director,
      desc: newMovie.desc,
    });
    console.log(req.body, req.headers);
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
    const { name, runtime, genre, trailer, image, cast, director, desc } =
      req.body;

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
        runtime: runtime ? runtime : movieExisted.runtime,
        genre: genre ? genre : movieExisted.genre,
        trailer: trailer ? trailer : movieExisted.trailer,
        image: image ? image : movieExisted.image,
        cast: cast ? cast : movieExisted.cast,
        director: director ? director : movieExisted.director,
        desc: desc ? desc : movieExisted.desc,
      },
      { new: true }
    );
    res.status(200).json({
      _id: updatedMovie._id,
      name: updatedMovie.name,
      runtime: updatedMovie.runtime,
      genre: updatedMovie.genre,
      trailer: updatedMovie.trailer,
      image: updatedMovie.image,
      cast: updatedMovie.cast,
      director: updatedMovie.director,
      desc: updatedMovie.desc,
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
      runtime: movieExisted.runtime,
      genre: movieExisted.genre,
      trailer: movieExisted.trailer,
      image: movieExisted.image,
      cast: movieExisted.cast,
      director: movieExisted.director,
      desc: movieExisted.desc,
    });
  } catch (err) {
    res.status(500);
    throw new Error(serverError("At edit movie controller", err));
  }
});

// @desc		Get all the movies
// @route		/api/movie/
// @access	  Public
const getMovies = asyncHandler(async (req, res) => {
  try {
    const movieExisted = await Movie.find({});

    res.status(200).json(movieExisted);
  } catch (err) {
    res.status(500);
    throw new Error(serverError("At get movie", err));
  }
});

// @desc		Get movie by ID
// @route		/api/movie/:movieId
// @access	  Public
const getMovieDetails = asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  try {
    const movieExisted = await Movie.find({ _id: movieId });

    res.status(200).json(movieExisted);
  } catch (err) {
    res.status(500);
    throw new Error(serverError("At get movie by id", err));
  }
});

module.exports = {
  addMovie,
  editMovie,
  deleteMovie,
  getMovies,
  getMovieDetails,
};
