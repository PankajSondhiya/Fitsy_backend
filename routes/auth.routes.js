const { verify } = require("jsonwebtoken");
const {
  signIn,
  signUp,
  signInWithOTP,
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.jwt");

module.exports = function (app) {
  app.post("/fitsy/api/v1/auth/signin", [verifyToken], signIn);
  app.post("/fitsy/api/v1/auth/signup", [verifyToken], signUp);
  // app.post("/fitsy/api/v1/auth/signin/otp", signInWithOTP") i
};
