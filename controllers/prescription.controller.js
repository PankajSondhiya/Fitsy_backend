const Prescription = require("../models/prescription.model");

async function createPrescription(req, res) {
  const prescription = await Prescription.create(req.body);
  console.log(prescription);
  res.status(201).send(prescription);
}

async function updatePrescriptionById(req, res) {
  const id = req.params.id;
  console.log(req.body);
  await Prescription.findByIdAndUpdate(id, req.body);

  res.status(200).send({
    message: `Prescription with ID ${id} updated successfully`,
  });
}

async function deletePrescriptionById(req, res) {
  const id = req.params.id;
  await Prescription.findByIdAndDelete(id);

  res.status(200).send({
    message: `Prescription with ID ${id} deleted successfully`,
  });
}

async function getAllPrescriptionByTheDoctorId(req, res) {
  const doctorId = req.params.id;

  const prescription = await Prescription.find({ doctorId: doctorId });
  res.status(200).send(prescription);
}

async function getAllPrescriptionByThePatientId(req, res) {
  const patientId = req.params.id;

  const prescription = await Prescription.find({ patientId: patientId });
  res.status(200).send(prescription);
}

async function getPrescriptionById(req, res) {
  const id = req.params.id;
  try {
    const prescription = await Prescription.findById(id).populate("medicines");
    res.status(200).send(prescription);
  } catch (ex) {
    res.status(404).send({
      message: `prescription with the ID : ${id}does not exist`,
    });
  }
}

module.exports = {
  createPrescription,
  updatePrescriptionById,
  getAllPrescriptionByTheDoctorId,
  getAllPrescriptionByThePatientId,
  getPrescriptionById,
  deletePrescriptionById,
};
