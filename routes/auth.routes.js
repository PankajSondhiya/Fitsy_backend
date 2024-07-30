const { verify } = require("jsonwebtoken");
const {
  signIn,
  signUp,
  resetPassword,
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.jwt");

module.exports = function (app) {
  app.post("/fitsy/api/v1/auth/signin", signIn);
  app.post("/fitsy/api/v1/auth/signup", signUp);
  app.put("/fitsy/api/v1/auth/resetpassword", resetPassword);
};
