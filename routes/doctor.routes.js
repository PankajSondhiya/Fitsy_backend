const {
  createDoctor,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
  getAllDoctors,
} = require("../controllers/doctor.controller");

module.exports = function (app) {
  app.post("/fitsy/api/v1/doctors", [verifyToken], createDoctor);

  app.get("/fitsy/api/v1/doctors", [verifyToken], getAllDoctors);

  app.get("/fitsy/api/v1/doctors/:id", [verifyToken], getDoctorById);

  app.put("/fitsy/api/v1/doctors/:id", [verifyToken], updateDoctorById);

  app.delete("/fitsy/api/v1/doctors/:id", [verifyToken], deleteDoctorById);
};
