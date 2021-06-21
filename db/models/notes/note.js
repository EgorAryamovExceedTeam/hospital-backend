const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  name: String,
  doctor: String,
  date: String,
  complaint: String,
});

module.exports = Note = mongoose.model("appointment", noteSchema);
