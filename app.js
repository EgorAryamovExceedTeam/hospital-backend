const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const apiRoutes = require("./modules/routers/auth.router");
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

app.use(cors());

app.use("/", apiRoutes);

app.listen(8000, () => {
  console.log("Server has been started on PORT: 8000...");
});
