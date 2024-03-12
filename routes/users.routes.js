const {
  getAllUsers,
  getUserById,
  UpdateUserById,
  deleteUserById,
} = require("../controllers/user.controller");
const { isAdmin, verifyToken } = require("../middleware/auth.jwt");

module.exports = function (app) {
  app.get("/fitsy/api/v1/users", [verifyToken], getAllUsers);
  app.get("/fitsy/api/v1/users/:id", [verifyToken], getUserById);
  app.put("/fitsy/api/v1/users/:id", [verifyToken], UpdateUserById);
  app.delete("/fitsy/api/v1/users/:id", [isAdmin], deleteUserById);
};
