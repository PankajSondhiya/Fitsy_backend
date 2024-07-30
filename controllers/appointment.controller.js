const { USERTYPES } = require("../constants");
const Appointment = require("../models/appointment.model");
const Doctor = require("../models/doctors.model");
const User = require("../models/user.model");

async function createAppoinment(req, res) {
  const userId = req.userId;
  const appointment = await Appointment.create(req.body);

  res.status(201).send(appointment);
}

async function updateAppoinment(req, res) {
  try {
    const id = req.params.id;

    const UpdatedAppoinment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: UpdatedAppoinment,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
}

async function deleteAppoinment(req, res) {
  const id = req.params.id;

  await Appointment.findByIdAndDelete(id);
  res.status(200).send(`appoinment with the id:${id} deleted successfully`);
}

async function getAllAppoinment(req, res) {
  const userId = req.userId;
  const user = await User.findOne({ userId: userId });

  let queryObj = {};
  if (req.userType === USERTYPES.ADMIN) {
  }
  if (req.userType === USERTYPES.DOCTOR) {
    const doc_id = user?._id;
    console.log(doc_id);

    const doctor = await Doctor.findOne({ user: doc_id });
    console.log(doctor);
    queryObj.doctor = doctor?._id;
  }
  if (req.userType === USERTYPES.PATIENT) {
    queryObj.userId = user?._id;
  }

  try {
    const appointments = await Appointment.find(queryObj)
      .populate("userId")
      .populate({
        path: "doctor",
        populate: {
          path: "user",
        },
      })
      .populate("hospital");
    res.status(201).send(appointments);
    console.log(appointments);
  } catch (error) {
    console.log(error);
  }
}

async function getAppoinmentById(req, res) {
  const id = req.params.id;
  const appoinment = await Appointment.findById(id);
  res.status(200).send(appoinment);
}

module.exports = {
  createAppoinment,
  updateAppoinment,
  deleteAppoinment,
  getAllAppoinment,
  getAppoinmentById,
};
