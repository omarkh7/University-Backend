const express = require("express");
const router = express.Router();

const {
    getAllBranchesMajor,
  getBranchesMajorbyId,
  createBranchesMajor,
  deleteBranchesMajorbyId,
  updateBranchMajor,
} = require("../Controllers/branchesmajorController");

const protect = require("../Middleware/authMiddleware");

router.get("/getallbranchesmajor",protect,getAllBranchesMajor);
router.get("/getbranchesmajorbyid/:id",protect, getBranchesMajorbyId);
router.post("/createbranchesmajor", protect,createBranchesMajor);
router.put("/updatebranchmajor/:id",protect, updateBranchMajor);
router.delete("/deletebranchmajor/:id",protect, deleteBranchesMajorbyId);

module.exports = router;
