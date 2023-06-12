const mongoose = require('mongoose')

const Inventory = mongoose.Schema({
  odometer: {
    type: String,
    required: true,
  },
  scratches: {
    type: String,
    required: true,
  },
  paint: {
    type: String,
    required: true,
  },
  accidents: {
    type: String,
    required: true,
  },
  previous_owners: {
    type: String,
    required: true,
  },
  registration_place: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
 photo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Cars",Inventory)