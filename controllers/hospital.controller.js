const Hospital = require("../models/hospital.model");

async function createHospital(req, res) {
  const hospital = await Hospital.create(req.body);
  res.status(201).send(hospital);
}
async function getHospitalById(req, res) {
  const id = req.params.id;

  try {
    const hospital = await Hospital.findById(id);
    res.status(200).send(hospital);
  } catch (ex) {
    res.status(404).send({
      message: `Hospital with the ${id} does'nt exist`,
    });
  }
}

async function updateHospitalById(req, res) {
  const id = req.params.id;

  const UpdatedHospital = await Hospital.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).send({
    message: `Hospital with the ${id} updated succesfully`,
    UpdatedHospital,
  });
}
async function getAllHospitals(req, res) {
  const hospitals = await Hospital.find({});
  res.status(200).send(hospitals);
}

async function deleteHospitalById(req, res) {
  const id = req.params.id;
  console.log(id);

  await Hospital.findByIdAndDelete(id);

  res.status(200).send({
    message: `Hospital with ID ${id} deleted successfully`,
  });
}

module.exports = {
  createHospital,
  updateHospitalById,
  getHospitalById,
  deleteHospitalById,
  getAllHospitals,
};
