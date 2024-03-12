const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bestBefore: {
    type: Number,
  },
  manufacturer: {
    type: String,
  },
  manufacturerAddress: {
    type: String,
  },
  price: {
    type: Number,
  },
  dosage: {
    type: String,
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

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
