const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    default: 0,
  },
  doctorType: {
    type: String,
  },
  gender: {
    type: String,
  },
  hospitals: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Hospital",
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
