const Branches = require("../Model/branchesModel");

// ========================GET ALL========================
const getAllBranches = async (req, res) => {
  try {
    const branches = await Branches.find();

    res.send(branches);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// ========================GET BY ID========================
const getBranchesbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const branches = await Branches.findById(id);

    res.send(branches);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// ========================CREATE========================

const createBranches = async (req, res) => {
    try {
      const {
        university_id,
        city_id,
        phoneNumber,
      } = req.body;

  
      const uni = await Branches.create({
        university_id,
        city_id,
        phoneNumber,
      });
  
      res.status(201).json(uni);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Failed to create Branch", reason: error.message });
    }
  };
  
  // ========================UPDATE========================
  const updateBranch= async (req, res) => {
    try {
      const {
        university_id,
        city_id,
        phoneNumber,
      
      } = req.body;
   
      const branchId = req.params.id;
  
      const updates = {};
  
      if (university_id) {
        updates.university_id = university_id;
      }
      if (city_id) {
        updates.city_id = city_id;
      }
      if (phoneNumber) {
        updates.phoneNumber = phoneNumber;
      }
  
  
      const updatedBranch = await Branches.findByIdAndUpdate(branchId, updates, {
        new: true,
      });
  
      if (!updatedBranch) {
        return res.status(404).json({ error: "Branch not found" });
      }
  
      res.status(200).json(updatedBranch);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update Branch" });
    }
  };
  

// ========================DELETE========================
const deleteBranchesbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const branches = await Branches.findByIdAndRemove(id);

    if (!branches) {
      return res.status(404).send("Branche not found");
    }

    res.send(branches);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllBranches,
  getBranchesbyId,
  createBranches,
  deleteBranchesbyId,
  updateBranch,
};
