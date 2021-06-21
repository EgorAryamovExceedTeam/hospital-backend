const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
} = require("../controllers/hospital.controller");

router.get("/", passport.authenticate("jwt", { session: false }), getAllNotes);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createNewNote
);
router.patch(
  "/updateInfo",
  passport.authenticate("jwt", { session: false }),
  updateNote
);
router.delete(
  "/deleteNote",
  passport.authenticate("jwt", { session: false }),
  deleteNote
);

module.exports = router;
