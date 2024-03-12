const { query } = require("express");
const { USERTYPES } = require("../constants");
const Sickness = require("../models/sickness.model");
const User = require("../models/user.model");
const Doctor = require("../models/doctors.model");

async function createSickness(req, res) {
  const sickness = await Sickness.create(req.body);
  res.status(201).send(sickness);
}

async function getSicknessById(req, res) {
  const id = req.params.id;
  try {
    const sickness = await Sickness.findById(id)
      .populate({
        path: "doctor",
        populate: {
          path: "user",
        },
      })
      .populate("prescription")
      .populate("patient")
      .populate("hospital");
    res.status(200).send(sickness);
  } catch (ex) {
    res.status(404).send({
      message: `Sickness with the ${id} does'nt exist`,
    });
  }
}
async function getAllSickness(req, res) {
  const user = await User.findOne({ userId: req.userId });
  console.log(user);
  // const user_id = user._id;

  const queryObj = {};

  if (req.userType === USERTYPES.PATIENT) {
    queryObj.patient = user._id;
  }
  if (req.userType === USERTYPES.DOCTOR) {
    const doc_id = req._id;
    const doctor = await Doctor.findOne({ user: doc_id });
    console.log("doctor===================", doctor);
    queryObj.doctor = doctor._id;
  }

  try {
    const sickness = await Sickness.find(queryObj)
      .populate({
        path: "doctor",
        populate: {
          path: "user",
        },
      })
      .populate({ path: "prescription", populate: { path: "medicines" } })
      .populate("patient")
      .populate("hospital");
    res.status(200).send(sickness);
  } catch (ex) {
    res.status(404).send({ message: `Failed to fetch sickness` });
  }
}

async function updateSicknessById(req, res) {
  const id = req.params.id;

  await Sickness.findByIdAndUpdate(id, req.body);

  res.status(200).send({
    message: `Sickness with ID ${id} updated successfully`,
  });
}
async function deleteSicknessById(req, res) {
  const id = req.params.id;

  await Sickness.findByIdAndDelete(id);

  res.status(200).send({
    message: `Sickness with ID ${id} deleted successfully`,
  });
}

module.exports = {
  getAllSickness,
  createSickness,
  getSicknessById,
  updateSicknessById,
  deleteSicknessById,
};
