const {
  signIn,
  signUp,
  signInWithOTP,
} = require("../controllers/auth.controller");

module.exports = function (app) {
  app.post("/fitsy/api/v1/auth/signin", signIn);
  app.post("/fitsy/api/v1/auth/signup", signUp);
  // app.post("/fitsy/api/v1/auth/signin/otp", signInWithOTP") i
};
