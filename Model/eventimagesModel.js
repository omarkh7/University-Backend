const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventimagesSchema = new Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Events",
        required: true,
      },
  url: {
    type: String,
    required: [true, "Please add an Image"],
  },


  
});

const EventImages = mongoose.model("EventImages", eventimagesSchema);
module.exports = EventImages;
