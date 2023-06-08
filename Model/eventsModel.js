const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a Name"],
  },

  description: {
    type: String,
    required: [true, "Please add a Description"],
  },
  event_owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },
  
});

const Events = mongoose.model("Events", eventsSchema);
module.exports = Events;
