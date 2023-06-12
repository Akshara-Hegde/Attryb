const mongoose = require("mongoose");

const OEM = mongoose.Schema({
  manufacturer:{
    type:String,
    required:true,
    
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },

  mileage: {
    type: String,
    required: true,
  },
  power: {
    type: String,
    required: true,
  },
  top_speed: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("OEM", OEM);
