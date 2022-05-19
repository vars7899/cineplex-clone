const Theatre = require("../models/Theatre");
const asyncHandler = require("express-async-handler");
const { serverError } = require("../error/serverError");

// @desc		Get all the theatre's information
// @route		/api/theatre
// @access		public
const getTheatres = asyncHandler(async (req, res) => {
  try {
    const allTheatre = await Theatre.find();
    res.status(200).json({
      theatreList: allTheatre,
    });
  } catch (err) {
    res.status(500);
    throw new Error(serverError("Get all theatre request failed"));
  }
});

// @desc		Create a new theatre
// @route		/api/theatre/create
// @access		admin
const createTheatre = asyncHandler(async (req, res) => {
  const { name, address, city, country, postalCode, timing, lat, long } =
    req.body;
  try {
    const newTheatre = await Theatre.create({
      name,
      address,
      city,
      country,
      postalCode,
      timing,
      lat,
      long,
    });
    res.status(200).json({
      _id: newTheatre._id,
      name: newTheatre.name,
      address: newTheatre.address,
      city: newTheatre.city,
      postalCode: newTheatre.postalCode,
      country: newTheatre.country,
      timing: newTheatre.timing,
      lat: newTheatre.lat,
      long: newTheatre.long,
      message: `${newTheatre.name} was created successfully`,
    });
  } catch (err) {
    res.status(500);
    throw new Error(serverError("Request to create new theatre failed"));
  }
});

// @desc			Get information of a particular theatre
// @route			/api/theatre:theatreId
// @access		public
const getRequestedTheatre = asyncHandler(async (req, res) => {
  const { theatreId } = req.params;
  try {
    const theatreExist = await Theatre.findById({ _id: theatreId });
    if (!theatreExist) {
      res.status(400);
      throw new Error(serverError("Invalid theatre ID"));
    }
    res.status(200).json({
      _id: theatreExist._id,
      name: theatreExist.name,
      address: theatreExist.address,
      city: theatreExist.city,
      postalCode: theatreExist.postalCode,
      country: theatreExist.country,
      lat: theatreExist.lat,
      long: theatreExist.long,
    });
  } catch (err) {
    res.status(500);
    throw new Error(
      serverError("Request to get information of theatre failed")
    );
  }
});

// @desc			Delete an existing theatre
// @route			/api/theatre/delete
// @access		admin
const deleteTheatre = asyncHandler(async (req, res) => {
  const { theatreId } = req.params;
  try {
    const theatreExist = await Theatre.findById({ _id: theatreId });
    if (!theatreExist) {
      res.status(400);
      throw new Error("Invalid theatre ID");
    }
    await Theatre.deleteOne({ _id: theatreId });
    res.status(200).json({
      _id: theatreExist._id,
      name: theatreExist.name,
      address: theatreExist.address,
      city: theatreExist.city,
      postalCode: theatreExist.postalCode,
      country: theatreExist.country,
      lat: theatreExist.lat,
      long: theatreExist.long,
      message: `${theatreExist.name} deleted successfully`,
    });
  } catch (err) {
    res.status(500);
    throw new Error(serverError("Request to delete the theatre failed"));
  }
});

// @desc			update the information of the theatre
// @route			/api:theatreId
// @access		admin
const updateTheatreInformation = asyncHandler(async (req, res) => {
  const { theatreId } = req.params;
  const { name, address, city, postalCode, country, lat, long } = req.body;

  try {
    const theatreExist = await Theatre.findOne({ _id: theatreId });
    if (!theatreExist) {
      res.status(400);
      throw new error(serverError("Invalid Theatre ID"));
    }
    const updatedTheatre = await Theatre.findByIdAndUpdate(
      { _id: theatreId },
      {
        name: name ? name : theatreExist.name,
        address: address ? address : theatreExist.address,
        city: city ? city : theatreExist.city,
        postalCode: postalCode ? postalCode : theatreExist.postalCode,
        country: country ? country : theatreExist.country,
        lat: lat ? lat : theatreExist.lat,
        long: long ? long : theatreExist.long,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      _id: theatreExist._id,
      name: updatedTheatre.name,
      address: updatedTheatre.address,
      city: updatedTheatre.city,
      postalCode: updatedTheatre.postalCode,
      country: updatedTheatre.country,
      lat: updatedTheatre.lat,
      long: updatedTheatre.long,
    });
  } catch (err) {
    res.status(500);
    throw new Error(
      serverError("Request to update theatre information failed")
    );
  }
});

// @desc			Get Theatre info by name
// @route			/api/theatre/search?s=''
// @access		public
const searchTheatre = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          name: { $regex: req.query.search, $options: "i" },
        }
      : {};

    const allTheatre = await Theatre.find(keyword);
    if (allTheatre.length === 0) {
      res.status(200).json({
        message: "No Theatre exist",
      });
    }
    res.status(200).json({
      theatres: allTheatre,
    });
  } catch (err) {
    res.status(500);
    throw new Error(
      serverError(`${err},  Request to update theatre information failed`)
    );
  }
});
module.exports = {
  getTheatres,
  createTheatre,
  getRequestedTheatre,
  deleteTheatre,
  updateTheatreInformation,
  searchTheatre,
};
