const BranchesMajor = require("../Model/branchesmajorModel");

// ========================GET ALL========================
const getAllBranchesMajor = async (req, res) => {
  try {
    const branchesmajor = await BranchesMajor.find();

    res.send(branchesmajor);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// ========================GET BY ID========================
const getBranchesMajorbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const branchesmajor = await BranchesMajor.findById(id);

    res.send(branchesmajor);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// ========================CREATE========================

const createBranchesMajor = async (req, res) => {
    try {
      const {
        branches_id,
        major_id,
      } = req.body;

  
      const branchesmajor = await BranchesMajor.create({
        branches_id,
        major_id,
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
  const updateBranchMajor= async (req, res) => {
    try {
      const {
        branches_id,
        major_id,
      
      } = req.body;
   
      const branchmajorId = req.params.id;
  
      const updates = {};
  
      if (branches_id) {
        updates.branches_id = branches_id;
      }
      if (major_id) {
        updates.major_id = major_id;
      }
 
  
      const updatedBranchmajor = await BranchesMajor.findByIdAndUpdate(branchmajorId, updates, {
        new: true,
      });
  
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
  getBranchesMajorbyId,
  createBranchesMajor,
  deleteBranchesMajorbyId,
  updateBranchMajor,
};
