const router = require("express").Router();
const {
  getTheatres,
  createTheatre,
  getRequestedTheatre,
  deleteTheatre,
  updateTheatreInformation,
  searchTheatre,
} = require("../controllers/TheatreControllers");

// TODO Routes for the theatre
// * 1. Create new theatre - done
// 2. Add new Movie to the theatre
// * 3. Update the information of the theatre - done
// * 4. delete the theatre - done
// * 5. Get all the theatre's - done
// * 6. Get one theatre information - done
// * 7. search the theatre - done

router.route("/").get(getTheatres);
router.route("/query").get(searchTheatre);
router.route("/create").post(createTheatre);
router
  .route("/:theatreId")
  .get(getRequestedTheatre)
  .put(updateTheatreInformation);
router.route("/delete/:theatreId").delete(deleteTheatre);
module.exports = router;
