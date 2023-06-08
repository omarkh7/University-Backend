const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchesmajorSchema = new Schema({
  branches_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branches",
    required: true,
  },
  major_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Major",
    required: true,
  },
 
});

const BranchesMajor = mongoose.model("BranchesMajor", branchesmajorSchema);
module.exports = BranchesMajor;
