const express = require("express");
const router = express.Router();

const {
    getAllBranchesMajor,
  getBranchesMajorbyId,
  createBranchesMajor,
  deleteBranchesMajorbyId,
  updateBranchMajor,
} = require("../Controllers/branchesmajorController");

router.get("/getallbranchesmajor", getAllBranchesMajor);
router.get("/getbranchesmajorbyid/:id", getBranchesMajorbyId);
router.post("/createbranchesmajor", createBranchesMajor);
router.put("/updatebranchmajor/:id", updateBranchMajor);
router.delete("/deletebranchmajor/:id", deleteBranchesMajorbyId);

module.exports = router;
