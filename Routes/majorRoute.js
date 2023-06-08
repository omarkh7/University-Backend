const express = require("express");
const router = express.Router();

const {
    getAllMajors,
    getMajorbyId,
    createMajor,
    deleteMajorbyId,
    updateMajor,
} = require("../Controllers/majorController");

router.get("/getallmajors", getAllMajors);
router.get("/getmajorbyid/:id", getMajorbyId);
router.post("/createmajor", createMajor);
router.put("/updatemajor/:id", updateMajor);
router.delete("/deletemajor/:id", deleteMajorbyId);

module.exports = router;
