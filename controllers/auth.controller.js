const SECRET_KEY = require("../configs/auth.config");
const { USERTYPES, USER_STATUS } = require("../constants");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const admin = require("../configs/firebaseAdmin");
const jwt = require("jsonwebtoken");
// Modified signUp function to include Firebase UID
async function signUp(req, res) {
  const { name, email, userId, password, userType } = req.body;

  try {
    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

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
      firebaseUid: userRecord.uid, // Save Firebase UID in MongoDB
    };

    const user = await User.create(userObj);

    // Set admin custom claim if userType is admin
    if (userType === "ADMIN") {
      await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
    }

    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      userId: user.userId,
      userType: user.userType,
      userStatus: user.userStatus,
      firebaseUid: user.firebaseUid,
    });
  } catch (error) {
    res.status(400).send(`Error creating user: ${error.message}`);
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user === null) {
    res.status(401).send({
      message: "failed! user does not exist",
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
      expiresIn: "1h",
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

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  console.log("oobcode", email);
  console.log(newPassword);

  try {
    console.log("email", email);

    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.send("Password has been updated");
  } catch (error) {
    res.status(500).send("Invalid or expired reset token");
  }
};
module.exports = {
  signUp,
  signIn,
  resetPassword,
};
