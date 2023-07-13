const BranchesMajor = require("../Model/branchesmajorModel");
const Branches = require("../Model/branchesModel");
const Cities = require("../Model/citiesModel");

// ========================GET ALL========================
const getAllBranchesMajor = async (req, res) => {
  let query = {};
  if (req.query.city_id) {
    query.city_id = req.query.city_id;
  }
  if (req.query.major_id) {
    query.major_id = req.query.major_id;
  }
  console.log(query);

  // try {
  const branchesmajorr = await BranchesMajor.find(query)

    .populate("major_id")
    .populate({
      path: "branch_id",
      populate: [
        { path: "city_id", model: "Cities" },
        { path: "university_id", model: "University" },
      ],
    });

  const mappedresult = [];
  const transformedArray = branchesmajorr.map((item) => {
    const index = mappedresult.findIndex(
      (u) => u.uniId === item.branch_id.university_id._id
    );
    if (index < 0) {
      const mappedItem = {
        id: item._id,
        uniId: item.branch_id.university_id._id,
        name: item.branch_id.university_id.name,
        description: item.branch_id.university_id.description,
        logo: item.branch_id.university_id.logo,
        majors: item.major_id.name,
        branches: item.branch_id.city_id.name,
        advantages_features: item.branch_id.university_id.advantages_features,
        classification: item.branch_id.university_id.classification,
        phoneNumber: item.branch_id.phoneNumber,
        website: item.branch_id.university_id.website,
        facebook: item.branch_id.university_id.facebook,
        linkedin: item.branch_id.university_id.linkedin,
        instagram: item.branch_id.university_id.instagram,
      };

      mappedresult.push(mappedItem);
    } else {
      mappedresult[index].branches += ', '+item.branch_id.city_id.name; //item.major_id.name
      mappedresult[index].majors += ', '+item.major_id.name; //
      // if (
      //   mappedresult[index].phoneNumber.indexOf(item.branch_id.phoneNumber) !== -1
      // ) {
        mappedresult[index].phoneNumber+= ', '+item.branch_id.phoneNumber;
      // }
    }
  });
  console.log("TESTINGG", mappedresult);
  res.send(mappedresult);
  return mappedresult;
};
// ========================GET BY ID========================
const getBMall = async (req, res) => {
  try {
    const branchesmajor = await BranchesMajor.find().populate({
      path: "branch_id",
      populate: [
        { path: "city_id", model: "Cities" },
        { path: "university_id", model: "University" },
      ],
    }).populate("major_id");

    res.send(branchesmajor);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// ========================CREATE========================

const createBranchesMajor = async (req, res) => {
  try {
    const { branch_id, major_id } = req.body;

    const universityBranch = await Branches.findById(branch_id);
    const branchesmajor = await BranchesMajor.create({
      major_id,
      university_id: universityBranch.university_id,
      city_id: universityBranch.city_id,
      branch_id: branch_id,
    });

    res.status(201).json(branchesmajor);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create Branch", reason: error.message });
  }
};

// ========================UPDATE========================
const updateBranchMajor = async (req, res) => {
  try {
    const { branches_id, major_id } = req.body;

    const branchmajorId = req.params.id;

    const updates = {};

    if (branches_id) {
      updates.branches_id = branches_id;
    }
    if (major_id) {
      updates.major_id = major_id;
    }

    const updatedBranchmajor = await BranchesMajor.findByIdAndUpdate(
      branchmajorId,
      updates,
      {
        new: true,
      }
    );

    if (!updatedBranchmajor) {
      return res.status(404).json({ error: "Branch Major not found" });
    }

    res.status(200).json(updatedBranchmajor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update Branch Major" });
  }
};

// ========================DELETE========================
const deleteBranchesMajorbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const branchesmajor = await BranchesMajor.findByIdAndRemove(id);

    if (!branchesmajor) {
      return res.status(404).send("Branche Major not found");
    }

    res.send(branchesmajor);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllBranchesMajor,
  getBMall,
  createBranchesMajor,
  deleteBranchesMajorbyId,
  updateBranchMajor,
};
