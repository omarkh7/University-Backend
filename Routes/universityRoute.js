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
} = require("../Controllers/universityController");

router.get("/getalluni", getAllUni);
router.get("/getunibyid/:id", getUnibyId);
router.post("/createuni", uploadfire.single("logo"), createUni);
router.put("/updateuni/:id",uploadfire.single("logo"), updateUni);
router.delete("/deleteuni/:id", deleteUnibyId);

module.exports = router;
