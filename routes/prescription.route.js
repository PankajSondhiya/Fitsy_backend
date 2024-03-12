const {
  createPrescription,
  getPrescriptionById,
  updatePrescriptionById,
  deletePrescriptionById,
  getAllPrescriptionByTheDoctorId,
  getAllPrescriptionByThePatientId,
} = require("../controllers/prescription.controller");
const { verifyToken } = require("../middleware/auth.jwt");

module.exports = function (app) {
  app.post("/fitsy/api/v1/prescriptions", [verifyToken], createPrescription);

  app.get(
    "/fitsy/api/v1/prescriptions/:id",
    [verifyToken],
    getPrescriptionById
  );

  app.put(
    "/fitsy/api/v1/prescriptions/:id",
    [verifyToken],
    updatePrescriptionById
  );

  app.delete(
    "/fitsy/api/v1/prescriptions/:id",
    [verifyToken],
    deletePrescriptionById
  );

  app.get(
    "/fitsy/api/v1/prescriptions/patient/:id",
    [verifyToken],
    getAllPrescriptionByThePatientId
  );

  app.get(
    "/fitsy/api/v1/prescriptions/doctor/:id",
    [verifyToken],
    getAllPrescriptionByTheDoctorId
  );
};
