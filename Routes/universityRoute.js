const express = require("express");
const router = express.Router();

const {initializeApp} = require('firebase/app');
const firebaseConfig = require('../Config/Firebase');
const multer = require("multer");
initializeApp(firebaseConfig);


const uploadfire=multer({storage:multer.memoryStorage()});

const {
  getAllUni,
  getUnibyId,
  createUni,
  deleteUnibyId,
  updateUni,
  getAllFilters,
} = require("../Controllers/universityController");

const protect = require("../Middleware/authMiddleware");


router.get("/getalluni", getAllUni);
router.get("/getAllFilters", getAllFilters);
router.get("/getunibyid/:id", getUnibyId);
router.post("/createuni", uploadfire.single("logo"),protect, createUni);
router.put("/updateuni/:id",uploadfire.single("logo"),protect, updateUni);
router.delete("/deleteuni/:id",protect, deleteUnibyId);

module.exports = router;
