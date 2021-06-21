const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const morgan = require("morgan");
const apiAuthRoutes = require("./modules/routers/auth.router");
const apiHospRoutes = require("./modules/routers/hospital.router");
const app = express();

dotenv.config();

app.use(morgan("dev"));
app.use(express.json());

const uri = process.env.URI;
mongoose.connect(uri, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use(cors());

app.use("/", apiAuthRoutes);
app.use("/", apiHospRoutes);

app.listen(8000, () => {
  console.log("Server has been started on PORT: 8000...");
});
