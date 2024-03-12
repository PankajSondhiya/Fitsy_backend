const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    minLength: 10,
    required: true,
    lowerCase: true,
    unique: true,
  },
  description: {
    type: String,
  },
  noOfBeds: {
    type: Number,
  },
  address: {
    type: String,
  },
  contactNo: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
