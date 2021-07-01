const express = require("express");
const auth = require("../../middleware/auth.middleware");
const router = express.Router();

const {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
} = require("../controllers/hospital.controller");

router.get("/", auth, getAllNotes);
router.post("/addNewNote", auth, createNewNote);
router.patch("/updateInfo", auth, updateNote);
router.delete("/deleteNote", auth, deleteNote);

module.exports = router;
