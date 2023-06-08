const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchesSchema = new Schema({
  university_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cities",
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please add a Number"],
  },
});

const Branches = mongoose.model("Branches", branchesSchema);
module.exports = Branches;
