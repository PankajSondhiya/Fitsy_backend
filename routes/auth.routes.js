const { verify } = require("jsonwebtoken");
const { signIn, signUp } = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.jwt");

module.exports = function (app) {
  app.post("/fitsy/api/v1/auth/signin", signIn);
  app.post("/fitsy/api/v1/auth/signup", signUp);
  // app.post("/fitsy/api/v1/auth/signin/otp", signInWithOTP") i
};
