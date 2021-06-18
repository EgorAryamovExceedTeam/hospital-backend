const bcryptjs = require("bcryptjs");
const User = require("../../db/models/users/user");

module.exports.addNewUser = (req, res) => {
  const body = req.body;
  const candidate = User.findOne({ login: body.login });
  console.log(candidate == true);
  if (candidate) {
    const salt = bcryptjs.genSalt(10);
    const password = body.password;

    const user = new User({
      login: body.login,
      password: bcryptjs.hash(password, salt),
    });

    try {
      user.save();
      res.status(201).json(user);
    } catch (e) {}
  } else {
    res.status(409).json({
      message: "This login has already use. Try another login",
    });
  }
};

module.exports.logInUser = (req, res) => {
  res.send("request succes");

  // if (
  //   body.hasOwnProperty("_id") &&
  //   (body.hasOwnProperty("login") || body.hasOwnProperty("password"))
  // ) {

  // }
};
