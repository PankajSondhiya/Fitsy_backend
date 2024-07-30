const admin = require("firebase-admin");

// const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")),
  // databaseURL: `mongodb+srv://${process.env.USERNAME_1}:${process.env.PASSWORD}@cluster0.1gsmies.mongodb.net/fitsy_db`, // Replace with your database URL
});

// const app = express();

module.exports = admin;
