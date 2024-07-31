const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  medicines: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Medicine",
  },
  doctorFee: {
    type: Number,
  },
  medicinesFee: {
    type: Number,
  },
  tests: {
    type: [String],
  },
  duration: {
    type: String,
  },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
