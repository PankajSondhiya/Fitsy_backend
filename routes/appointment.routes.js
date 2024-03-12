const {
  createAppoinment,
  updateAppoinment,
  getAllAppoinment,
  getAppoinmentById,
  deleteAppoinment,
} = require("../controllers/appointment.controller");
const { verifyToken } = require("../middleware/auth.jwt");

module.exports = function (app) {
  app.post("/fitsy/api/v1/appointment", [verifyToken], createAppoinment);
  app.put("/fitsy/api/v1/appointment/:id", [verifyToken], updateAppoinment);
  app.get("/fitsy/api/v1/appointment", [verifyToken], getAllAppoinment);
  app.get("/fitsy/api/v1/appointment/:id", [verifyToken], getAppoinmentById);
  app.delete("/fitsy/api/v1/appointment/:id", [verifyToken], deleteAppoinment);
};
