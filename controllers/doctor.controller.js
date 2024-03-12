const Doctor = require("../models/doctors.model");
const User = require("../models/user.model");

async function createDoctor(req, res) {
  const doctor = await Doctor.create(req.body);
  res.status(201).send(doctor);
}

async function getDoctorById(req, res) {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findOne({ user: id })
      .populate("user", "name userId email")
      .populate("hospitals");
    res.status(200).send({
      user: doctor.user,
      description: doctor.description,
      experience: doctor.experience,
      doctorType: doctor.doctorType,
      hospital: doctor.hospitals,
      gender: doctor.gender,
    });
  } catch (ex) {
    res.status(404).send({
      message: `Doctor with the ${id} does'nt exist`,
    });
  }
}

async function updateDoctorById(req, res) {
  const id = req.params.id;
  await Doctor.findByIdAndUpdate(id, req.body);

  res.status(200).send({
    message: `Doctor with ID ${id} updated successfully`,
  });
}

async function deleteDoctorById(req, res) {
  const id = req.params.id;
  await Doctor.findByIdAndDelete(id);
  res.status(200).send({
    message: `Doctor with the doctorId:${id} deleted`,
  });
}
async function getAllDoctors(req, res) {
  const doctors = await Doctor.find({})
    .populate("user", "name userId email")
    .populate("hospitals");
  res.send(doctors);
}

module.exports = {
  getAllDoctors,
  createDoctor,
  deleteDoctorById,
  getDoctorById,
  updateDoctorById,
};
