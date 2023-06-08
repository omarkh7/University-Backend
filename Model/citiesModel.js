const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citiesSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a Name"],
  },
});

const Cities = mongoose.model("Cities", citiesSchema);
module.exports = Cities;
