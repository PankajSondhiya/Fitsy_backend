const {
  createHospital,
  getHospitalById,
  updateHospitalById,
  deleteHospitalById,
  getAllHospitals,
} = require("../controllers/hospital.controller");
const { isAdmin } = require("../middleware/auth.jwt");

module.exports = function (app) {
  app.post("/fitsy/api/v1/hospitals", [isAdmin], createHospital);

  app.get("/fitsy/api/v1/hospitals/:id", [verifyToken], getHospitalById);

  app.get("/fitsy/api/v1/hospitals", [verifyToken], getAllHospitals);

  app.put("/fitsy/api/v1/hospitals/:id", [isAdmin], updateHospitalById);

  app.delete("/fitsy/api/v1/hospitals/:id", [isAdmin], deleteHospitalById);
};
