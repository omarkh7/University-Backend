const Major = require("../Model/majorModel");

// ========================GET ALL========================
const getAllMajors = async (req, res) => {
  try {
    const major = await Major.find();

    res.send(major);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// ========================GET BY ID========================
const getMajorbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const major = await Major.findById(id);

    res.send(major);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// ========================CREATE========================

const createMajor = async (req, res) => {
  try {
    const name = req.body;

    const major = await Major.create(name);

    res.status(201).json(major);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create Major", reason: error.message });
  }
};

// ========================UPDATE========================
const updateMajor = async (req, res) => {
  try {
    const name = req.body;

    const majorId = req.params.id;
    if (!name.name) {
      return res
        .status(404)
        .json({ error: "Add a name", reason: error.message });
    }

    const updatedMajor = await Major.findByIdAndUpdate(majorId, name, {
      new: true,
    });

    if (!updatedMajor) {
      return res.status(404).json({ error: "Major not found" });
    }

    res.status(200).json(updatedMajor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update City" });
  }
};

// ========================DELETE========================
const deleteMajorbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const major = await Major.findByIdAndRemove(id);

    if (!major) {
      return res.status(404).send("Major not found");
    }

    res.send(major);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllMajors,
  getMajorbyId,
  createMajor,
  deleteMajorbyId,
  updateMajor,
};
