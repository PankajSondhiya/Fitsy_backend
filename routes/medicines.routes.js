const {
  createMedicine,
  getMedicineById,
  deleteMedicineById,
  updateMedicinesbyId,
  getAllMedicines,
} = require("../controllers/medicines.controller");
const { verifyToken } = require("../middleware/auth.jwt");

module.exports = function (app) {
  app.post("/fitsy/api/v1/medicines", [verifyToken], createMedicine);
  app.get("/fitsy/api/v1/medicines/:id", [verifyToken], getMedicineById);
  app.get("/fitsy/api/v1/medicines/", [verifyToken], getAllMedicines);
  app.put("/fitsy/api/v1/medicines/:id", [verifyToken], updateMedicinesbyId);
  app.delete("/fitsy/api/v1/medicines/:id", [verifyToken], deleteMedicineById);
};
