const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const universitySchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a Name"],
  },

  description: {
    type: String,
    required: [true, "Please add a Description"],
  },
  logo: {
    type: String,
    required: [true, "Please add a Logo"],
  },
  advantages_features: {
    type: String,
    required: [true, "Please add a Advantage Feature"],

  },
  classification: {
    type: Number,
    required: [true, "Please add a Classification"],
  },
  website: {
    type: String,
  },
  facebook: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  instagram: {
    type: String,
  },
  
  
});

const University = mongoose.model("University", universitySchema);
module.exports = University;
