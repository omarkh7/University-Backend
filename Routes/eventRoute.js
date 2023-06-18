const express = require("express");
const router = express.Router();

const {
    getAllEvents,
    getEventbyId,
    createEvent,
    deleteEventbyId,
    updateEvent,
} = require("../Controllers/eventsController");

const protect = require("../Middleware/authMiddleware");

router.get("/getallevents",protect, getAllEvents);
router.get("/geteventbyid/:id",protect, getEventbyId);
router.post("/createevent",protect, createEvent);
router.put("/updateevent/:id",protect, updateEvent);
router.delete("/deleteevent/:id",protect, deleteEventbyId);

module.exports = router;
