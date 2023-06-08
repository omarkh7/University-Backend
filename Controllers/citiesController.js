const Cities = require("../Model/citiesModel");

// ========================GET ALL========================
const getAllCities = async (req, res) => {
  try {
    const city = await Cities.find();

    res.send(city);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// ========================GET BY ID========================
const getCitybyId = async (req, res) => {
  const id = req.params.id;
  try {
    const city = await Cities.findById(id);

    res.send(city);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// ========================CREATE========================

const createCity = async (req, res) => {
  try {
    const name = req.body;

    const city = await Cities.create(name);

    res.status(201).json(city);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create City", reason: error.message });
  }
};

// ========================UPDATE========================
const updateCity = async (req, res) => {
  try {
    const name = req.body;

    const cityId = req.params.id;
    if (!name.name) {
      return res
        .status(404)
        .json({ error: "Add a name", reason: error.message });
    }

    const updatedCity = await Cities.findByIdAndUpdate(cityId, name, {
      new: true,
    });

    if (!updatedCity) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json(updatedCity);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update City" });
  }
};

// ========================DELETE========================
const deleteCitybyId = async (req, res) => {
  const id = req.params.id;
  try {
    const city = await Cities.findByIdAndRemove(id);

    if (!city) {
      return res.status(404).send("City not found");
    }

    res.send(city);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllCities,
  getCitybyId,
  createCity,
  deleteCitybyId,
  updateCity,
};
