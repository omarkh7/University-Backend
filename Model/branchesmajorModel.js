const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchesmajorSchema = new Schema({

  major_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Major",
    required: true,
  },

 
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branches",
    required: true,
  },
  
 
});

const BranchesMajor = mongoose.model("BranchesMajor", branchesmajorSchema);
module.exports = BranchesMajor;