const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  name: String,
  doctor: String,
  date: String,
  complaint: String,
  login: String,
});

module.exports = Note = mongoose.model("appointment", noteSchema);
