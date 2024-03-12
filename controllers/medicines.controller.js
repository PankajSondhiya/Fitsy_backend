const Medicine = require("../models/medicines.model");

async function createMedicine(req, res) {
  const medicines = await Medicine.create(req.body);
  res.status(201).send(medicines);
}

async function getMedicineById(req, res) {
  const id = req.params.id;
  try {
    const medicines = await Medicine.findById(id);
    res.status(200).send(medicines);
  } catch (ex) {
    res.status(404).send({
      message: `medicines with the ${id} does'nt exist `,
    });
  }
}
async function getAllMedicines(req, res) {
  try {
    const data = await Medicine.find({});
    res.status(200).send(data);
  } catch (ex) {
    console.log(ex);
  }
}

async function updateMedicinesbyId(req, res) {
  const id = req.params.id;

  await Medicine.findByIdAndUpdate(id, req.body);

  res.status(200).send({
    message: `medicines with the ID ${id} updated successfully`,
  });
}

async function deleteMedicineById(req, res) {
  const id = req.params.id;
  await Medicine.findByIdAndDelete(id);
  res.status(200).send({
    message: `Medicine with ID ${id} deleted successfully`,
  });
}

module.exports = {
  createMedicine,
  getMedicineById,
  updateMedicinesbyId,
  deleteMedicineById,
  getAllMedicines,
};
