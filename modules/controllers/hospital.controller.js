const Note = require("../../db/models/notes/note");

// get all notes
module.exports.getAllNotes = (req, res) => {
  res.send("get");
};

// create a new note
module.exports.createNewNote = (req, res) => {
  res.send("post");
};

// change note's info
module.exports.updateNote = (req, res) => {
  res.send("patch");
};

// delete note
module.exports.deleteNote = (req, res) => {
  res.send("delete");
};
