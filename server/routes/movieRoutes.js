const router = require("express").Router();
const {
  addMovie,
  editMovie,
  deleteMovie,
  getMovies,
} = require("../controllers/MovieControllers");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

// TODO Routes for the movie
// 1. Add a new Movie -- done
// 2. Update movie details -- done
// 3. delete movie -- done
// 4. Get all the movies

router.route("/").get(getMovies);
router.route("/addmovie").post(auth, admin, addMovie);
router.route("/editmovie/:movieId").put(auth, admin, editMovie);
router.route("/deletemovie/:movieId").delete(auth, admin, deleteMovie);

module.exports = router;
