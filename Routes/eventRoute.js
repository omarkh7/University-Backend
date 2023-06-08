const express = require("express");
const router = express.Router();

const {
    getAllEvents,
    getEventbyId,
    createEvent,
    deleteEventbyId,
    updateEvent,
} = require("../Controllers/eventsController");

router.get("/getallevents", getAllEvents);
router.get("/geteventbyid/:id", getEventbyId);
router.post("/createevent", createEvent);
router.put("/updateevent/:id", updateEvent);
router.delete("/deleteevent/:id", deleteEventbyId);

module.exports = router;
