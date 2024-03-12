const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  doctor: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Doctor",
    required: true,
  },
  date: {
    type: Date,
  },
  disease: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  hospital: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Hospital",
    required: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Appointment = mongoose.model("Appoinment", appointmentSchema);

module.exports = Appointment;
