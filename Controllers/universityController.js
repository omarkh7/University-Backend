const University = require("../Model/universityModel");
const Major = require("../Model/majorModel");
const Cities = require("../Model/citiesModel");
const uploadsingle = require("../Middleware/uploadsingleMiddleware");

const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

const storage = getStorage();
// ========================GET ALL========================
const getAllUni = async (req, res) => {
  try {
    const uni = await University.find();

    res.send(uni);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// ========================GET BY ID========================
const getUnibyId = async (req, res) => {
  const id = req.params.id;
  try {
    const uni = await University.findById(id);

    res.send(uni);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// ========================CREATE========================

const createUni = async (req, res) => {
  try {
    const {
      name,
      description,
      advantages_features,
      classification,
      website,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    console.log(name,description,advantages_features, classification, website, facebook, linkedin, instagram)
    const logo = await uploadsingle(req.file);
    const logoURL = logo.downloadURL;

    const uni = await University.create({
      name,
      description,
      advantages_features,
      classification,
      website,
      facebook,
      linkedin,
      instagram,
      logo: logoURL,
    });

    res.status(201).json(uni);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create University", reason: error.message });
  }
};

// ========================UPDATE========================
const updateUni = async (req, res) => {
  try {
    const {
      name,
      description,
      advantages_features,
      classification,
      website,
      facebook,
      linkedin,
      instagram,
    } = req.body;
    const logoFile = req.file;
    const uniId = req.params.id;

    const updates = {};

    if (name) {
      updates.name = name;
    }
    if (description) {
      updates.description = description;
    }
    if (advantages_features) {
      updates.advantages_features = advantages_features;
    }
    if (classification) {
      updates.classification = classification;
    }
    if (website) {
      updates.website = website;
    }
    if (facebook) {
      updates.facebook = facebook;
    }
    if (instagram) {
      updates.instagram = instagram;
    }
    if (linkedin) {
      updates.linkedin = linkedin;
    }

    if (logoFile) {
      const uploadResult = await uploadsingle(logoFile);
      updates.logo = uploadResult.downloadURL;
    }

    const updatedUni = await University.findByIdAndUpdate(uniId, updates, {
      new: true,
    });

    if (!updatedUni) {
      return res.status(404).json({ error: "Uni not found" });
    }

    res.status(200).json(updatedUni);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update Uni" });
  }
};

// ========================DELETE========================
const deleteUnibyId = async (req, res) => {
  const id = req.params.id;
  try {
    const uni = await University.findByIdAndRemove(id);

    if (!uni) {
      return res.status(404).send("Uni not found");
    }

    res.send(uni);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};


const getAllFilters = async (req, res) => {
  try {
    const majors = await Major.find();
    const cities = await Cities.find();

    const filters = {
      locations: cities,
      majors: majors
    };

    res.send(filters);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = {
  getAllUni,
  getUnibyId,
  createUni,
  deleteUnibyId,
  updateUni,
  getAllFilters,
};
