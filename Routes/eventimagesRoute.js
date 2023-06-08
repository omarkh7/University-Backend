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

router.get("/getalleventimages", getAllEventImages);
router.get("/geteventimagesbyid/:id", getEventImagesbyId);
router.post("/createeventimages", uploadfire.single("url"), createEventImages);
router.put("/updateeventimages/:id",uploadfire.single("url"), updateEventImages);
router.delete("/deleteeventimages/:id", deleteEventImagesbyId);

module.exports = router;
