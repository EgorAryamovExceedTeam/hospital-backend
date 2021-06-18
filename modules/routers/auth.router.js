const express = require("express");
const router = express.Router();

const { addNewUser, logInUser } = require("../controllers/auth.controller");

router.post("/auth/registration", addNewUser);
router.post("/auth/login", logInUser);

module.exports = router;
