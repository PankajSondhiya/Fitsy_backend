const {
  createSickness,
  getSicknessById,
  updateSicknessById,
  deleteSicknessById,
  getAllSickness,
} = require("../controllers/sickness.controller");
const { verifyToken } = require("../middleware/auth.jwt");

module.exports = function (app) {
  app.get("/fitsy/api/v1/sicknesses", [verifyToken], getAllSickness);
  app.post("/fitsy/api/v1/sicknesses", createSickness);

  app.get("/fitsy/api/v1/sicknesses/:id", [verifyToken], getSicknessById);

  app.put("/fitsy/api/v1/sicknesses/:id", [verifyToken], updateSicknessById);

  app.delete("/fitsy/api/v1/sicknesses/:id", deleteSicknessById);
};
