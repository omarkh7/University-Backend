const EventImages = require("../Model/eventimagesModel");
const Events = require("../Model/eventsModel");
const University = require("../Model/universityModel");

// ========================GET ALL========================
const getAllEvents = async (req, res) => {
  try {
    Events.aggregate([
      {
        $lookup: {
          from: 'event_images',
          localField: '_id',
          foreignField: 'event_id',
          as: 'images',
        },
      },{
        $lookup: {
          from: 'universities',
          localField: 'event_owner',
          foreignField: '_id',
          as: 'owner',
        },
      },
    ])
        .then((events) => {
          const mappedEvents = events.map((event) => {
            const university = event.owner[0];
            return {
              name: event.name,
              description: event.description,
              owner_name: university.name,
              owner_image: university.logo,
              images: event.images,
            };
          });
          res.send(mappedEvents);
          console.log(mappedEvents);
        })
        .catch((error) => {
          res.send([]);
          console.error(error);
        });

  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// ========================GET BY ID========================
const getEventbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Events.findById(id);

    res.send(event);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// ========================CREATE========================

const createEvent = async (req, res) => {
  try {
    const { name, description, event_owner } = req.body;

    const event = await Events.create({
      name,
      description,
      event_owner,
    });

    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create Event", reason: error.message });
  }
};

// ========================UPDATE========================
const updateEvent = async (req, res) => {
  try {
    const { name, description, event_owner } = req.body;
    const eventId = req.params.id;

    const updates = {};

    if (name) {
      updates.name = name;
    }
    if (description) {
      updates.description = description;
    }
    if (event_owner) {
      updates.event_owner = event_owner;
    }

    const updateEvent = await Events.findByIdAndUpdate(eventId, updates, {
      new: true,
    });

    if (!updateEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(updateEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update Event" });
  }
};

// ========================DELETE========================
const deleteEventbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Events.findByIdAndRemove(id);

    if (!event) {
      return res.status(404).send("Uni not found");
    }

    res.send(event);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllEvents,
  getEventbyId,
  createEvent,
  deleteEventbyId,
  updateEvent,
};
