const Note = require("../../db/models/notes/note");
const User = require("../../db/models/users/user");
const errorHandler = require("../../utils/errorHandler");

// get all notes
module.exports.getAllNotes = (req, res) => {
  try {
    Note.find({ login: req.user.login }).then((result) => {
      res.send({ data: result });
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

// create a new note
module.exports.createNewNote = (req, res) => {
  const { name, doctor, date, complaint } = req.body;
  if (
    // request necessary fields?
    name &&
    doctor &&
    date &&
    complaint
  ) {
    try {
      const note = new Note({
        name: name,
        doctor: doctor,
        date: date,
        complaint: complaint,
        login: req.user.login,
      });
      note.save().then(() => {
        Note.find({ login: req.user.login }).then((result) => {
          res.send({ data: result });
        });
      });
    } catch (e) {
      errorHandler(res, e);
    }
  } else {
    // if body has no one or more fields, or fields has no values
    res.status(409).send({
      message:
        "Some propertyes or values are absend, change body and repeate request",
    });
  }
};

// change note's info
module.exports.updateNote = (req, res) => {
  const { _id, name, doctor, date, complaint, login } = req.body;
  const body = req.body;
  if (
    // request necessary fields?
    _id &&
    name &&
    doctor &&
    date &&
    complaint
  ) {
    try {
      Note.updateOne({ _id: body._id }, body).then(() => {
        Note.find({ login: login }).then((result) => {
          res.send({ data: result });
        });
      });
    } catch (e) {
      errorHandler(res.e);
    }
    // if body has no one or more fields
  } else {
    res.status(409).send({
      message:
        "Some propertyes or values are absend, change body and repeate request",
    });
  }
};

// delete note
module.exports.deleteNote = (req, res) => {
  try {
    Note.deleteOne({ _id: req.query._id }).then(() => {
      Note.find({ login: req.user.login }).then((result) => {
        res.send({ data: result });
      });
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
