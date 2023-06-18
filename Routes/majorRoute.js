const express = require("express");
const router = express.Router();

const {
    getAllMajors,
    getMajorbyId,
    createMajor,
    deleteMajorbyId,
    updateMajor,
} = require("../Controllers/majorController");
const protect = require("../Middleware/authMiddleware");


router.get("/getallmajors", protect,getAllMajors);
router.get("/getmajorbyid/:id",protect, getMajorbyId);
router.post("/createmajor",protect, createMajor);
router.put("/updatemajor/:id",protect, updateMajor);
router.delete("/deletemajor/:id",protect, deleteMajorbyId);

module.exports = router;
