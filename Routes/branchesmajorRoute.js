const express = require("express");
const router = express.Router();

const {
    getAllBranchesMajor,
    getBMall,
  createBranchesMajor,
  deleteBranchesMajorbyId,
  updateBranchMajor,
} = require("../Controllers/branchesmajorController");

const protect = require("../Middleware/authMiddleware");

router.get("/getallbranchesmajor",getAllBranchesMajor);
router.get("/getbmall", getBMall);
router.post("/createbranchesmajor", protect,createBranchesMajor);
router.put("/updatebranchmajor/:id",protect, updateBranchMajor);
router.delete("/deletebranchmajor/:id",protect, deleteBranchesMajorbyId);

module.exports = router;
