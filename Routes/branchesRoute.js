const express = require("express");
const router = express.Router();

const {
  getAllBranches,
  getBranchesbyId,
  createBranches,
  deleteBranchesbyId,
  updateBranch,
} = require("../Controllers/branchesController");

const protect = require("..//Middleware/authMiddleware");

router.get("/getallbranches/:cityid?", getAllBranches);
router.get("/getbranchesbyid/:id", getBranchesbyId);
router.post("/createbranches",protect, createBranches);
router.put("/updatebranch/:id",protect, updateBranch);
router.delete("/deletebranch/:id",protect, deleteBranchesbyId);

module.exports = router;
