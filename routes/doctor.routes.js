const {
  createDoctor,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
  getAllDoctors,
} = require("../controllers/doctor.controller");

module.exports = function (app) {
  app.post("/fitsy/api/v1/doctors", createDoctor);

  app.get("/fitsy/api/v1/doctors", getAllDoctors);

  app.get("/fitsy/api/v1/doctors/:id", getDoctorById);

  app.put("/fitsy/api/v1/doctors/:id", updateDoctorById);

  app.delete("/fitsy/api/v1/doctors/:id", deleteDoctorById);
};
