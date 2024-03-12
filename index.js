require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const { DB_URL } = require("./configs/db.config");
const { PORT } = require("./configs/server.config");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

require("./routes/auth.routes")(app);
require("./routes/doctor.routes")(app);
require("./routes/hospital.routes")(app);
require("./routes/medicines.routes")(app);
require("./routes/prescription.route")(app);
require("./routes/sickness.routes")(app);
require("./routes/appointment.routes")(app);
require("./routes/users.routes")(app);

mongoose
  .connect(`${DB_URL}`)
  .then(() => console.log("connected to mongoDB successfully"))
  .catch((ex) => console.log(ex));

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
