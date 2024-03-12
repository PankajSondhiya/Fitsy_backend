const SECRET_KEY = require("../configs/auth.config");
const { USERTYPES, USER_STATUS } = require("../constants");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function signUp(req, res) {
  const { name, email, userId, password, userType } = req.body;

  const userObj = {
    name,
    email,
    userId,
    password: bcrypt.hashSync(password, 10),
    userType,
    userStatus:
      userType === USERTYPES.PATIENT
        ? USER_STATUS.APPROVED
        : USER_STATUS.PENDING,
  };
  User.create(userObj)
    .then((data) => {
      res.status(200).send({
        _id: data._id,
        name: data.name,
        email: data.email,
        userId: data.userId,
        userType: data.userType,
        userStatus: data.userStatus,
      });
    })
    .catch((err) => res.status(400).send(err));
}

async function signIn(req, res) {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId: userId });

  if (user === null) {
    res.status(401).send({
      message: "failed! user id does not exist",
    });
    return;
  }

  if (user.userStatus !== USER_STATUS.APPROVED) {
    return res.status(401).send({
      message: "admin is yet to approved your sign in request",
    });
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    res.status(401).send({
      message: "Password is invalid",
    });
    return;
  }
  const accessToken = jwt.sign(
    {
      userId: user.userId,
      userType: user.userType,
      _id: user._id,
      email: user.email,
    },
    SECRET_KEY,
    {
      expiresIn: "6h",
    }
  );
  res.status(200).send({
    user_id: user._id,
    userId: user.userId,
    userName: user.name,
    userStatus: user.userStatus,
    userType: user.userType,
    accessToken,
  });
}

module.exports = {
  signUp,
  signIn,
};
