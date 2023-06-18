const express = require("express");
const router = express.Router();

const {
  getAllCities,
  getCitybyId,
  createCity,
  deleteCitybyId,
  updateCity,
} = require("../Controllers/citiesController");


const protect = require("../Middleware/authMiddleware");


router.get("/getallcities",protect, getAllCities);
router.get("/getcitybyid/:id", protect,getCitybyId);
router.post("/createcity",protect, createCity);
router.put("/updatecity/:id",protect, updateCity);
router.delete("/deletecity/:id",protect, deleteCitybyId);

module.exports = router;
