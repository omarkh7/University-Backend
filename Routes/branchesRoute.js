const express = require("express");
const router = express.Router();

const {
    getAllBranches,
    getBranchesbyId,
    createBranches,
    deleteBranchesbyId,
    updateBranch,
} = require("../Controllers/branchesController");

router.get("/getallbranches", getAllBranches);
router.get("/getbranchesbyid/:id", getBranchesbyId);
router.post("/createbranches", createBranches);
router.put("/updatebranch/:id", updateBranch);
router.delete("/deletebranch/:id", deleteBranchesbyId);

module.exports = router;
