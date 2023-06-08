const express = require("express");
const router = express.Router();

const {
  getAllCities,
  getCitybyId,
  createCity,
  deleteCitybyId,
  updateCity,
} = require("../Controllers/citiesController");

router.get("/getallcities", getAllCities);
router.get("/getcitybyid/:id", getCitybyId);
router.post("/createcity", createCity);
router.put("/updatecity/:id", updateCity);
router.delete("/deletecity/:id", deleteCitybyId);

module.exports = router;
