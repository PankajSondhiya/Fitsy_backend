const mongoose = require("mongoose");

const sicknessSchema = new mongoose.Schema({
  patient: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  diagnosis: {
    type: String,
    required: true,
  },
  doctor: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Doctor",
  },
  hospital: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Hospital",
  },
  prescription: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Prescription",
  },
});

const Sickness = mongoose.model("Sickness", sicknessSchema);

module.exports = Sickness;
