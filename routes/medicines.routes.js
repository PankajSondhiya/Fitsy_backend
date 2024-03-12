const {
  createMedicine,
  getMedicineById,
  deleteMedicineById,
  updateMedicinesbyId,
  getAllMedicines,
} = require("../controllers/medicines.controller");

module.exports = function (app) {
  app.post("/fitsy/api/v1/medicines", createMedicine);
  app.get("/fitsy/api/v1/medicines/:id", getMedicineById);
  app.get("/fitsy/api/v1/medicines/", getAllMedicines);
  app.put("/fitsy/api/v1/medicines/:id", updateMedicinesbyId);
  app.delete("/fitsy/api/v1/medicines/:id", deleteMedicineById);
};
