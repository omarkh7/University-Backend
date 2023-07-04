const EventImages = require("../Model/eventimagesModel");
const uploadsingle = require("../Middleware/uploadsingleMiddleware");

const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

const storage = getStorage();
// ========================GET ALL========================
const getAllEventImages = async (req, res) => {
  try {
    const eventimages = await EventImages.find().populate("event_id");

    res.send(eventimages);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// ========================GET BY ID========================
const getEventImagesbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const eventimages = await EventImages.findById(id);

    res.send(eventimages);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// ========================CREATE========================

const createEventImages = async (req, res) => {
  try {
    const {event_id} = req.body;
    const url = await uploadsingle(req.file);
    const imageurl = url.downloadURL;

    const eventimages = await EventImages.create({
      event_id,

      url: imageurl,
    });

    res.status(201).json(eventimages);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create Event Images", reason: error.message });
  }
};

// ========================UPDATE========================
const updateEventImages = async (req, res) => {
  try {
    const {event_id }= req.body;
    const urlFile = req.file;
    const eventimagesId = req.params.id;

    const updates = {};

    if (event_id) {
      updates.event_id = event_id;
    }

    if (urlFile) {
      const uploadResult = await uploadsingle(urlFile);
      updates.url = uploadResult.downloadURL;
    }

    const updatedEventImage = await EventImages.findByIdAndUpdate(
      eventimagesId,
      updates,
      {
        new: true,
      }
    );

    if (!updatedEventImage) {
      return res.status(404).json({ error: "Uni not found" });
    }

    res.status(200).json(updatedEventImage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update Uni" });
  }
};

// ========================DELETE========================
const deleteEventImagesbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const eventimages = await EventImages.findByIdAndRemove(id);

    if (!eventimages) {
      return res.status(404).send("Uni not found");
    }

    res.send(eventimages);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllEventImages,
  getEventImagesbyId,
  createEventImages,
  deleteEventImagesbyId,
  updateEventImages,
};
