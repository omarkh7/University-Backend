const express = require("express");
const router = express.Router();

const {initializeApp} = require('firebase/app');
const firebaseConfig = require('../Config/Firebase');
const multer = require("multer");
initializeApp(firebaseConfig);


const uploadfire=multer({storage:multer.memoryStorage()});

const {
    getAllEventImages,
    getEventImagesbyId,
    createEventImages,
    deleteEventImagesbyId,
    updateEventImages,
} = require("../Controllers/eventsimagesController");
const protect = require("../Middleware/authMiddleware");


router.get("/getalleventimages",protect, getAllEventImages);
router.get("/geteventimagesbyid/:id",protect, getEventImagesbyId);
router.post("/createeventimages", uploadfire.single("url"),protect, createEventImages);
router.put("/updateeventimages/:id",uploadfire.single("url"),protect, updateEventImages);
router.delete("/deleteeventimages/:id", protect,deleteEventImagesbyId);

module.exports = router;
