const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../db/models/users/user");
const errorHandler = require("../../utils/errorHandler");

// create new user
module.exports.addNewUser = (req, res) => {
  const { login, password } = req.body;
  User.findOne({ login: Login }).then((candidate) => {
    if (!candidate) {
      // if login absend in DB create new user
      const salt = bcryptjs.genSaltSync(10);
      const user = new User({
        login: login,
        password: bcryptjs.hashSync(password, salt),
      });

      try {
        user.save().then(() => {
          //create token
          const token = jwt.sign(
            {
              login: candidate.login,
              userId: candidate._id,
            },
            process.env.JWT,
            { expiresIn: 60 * 60 }
          );
          res.status(201).send({ token: token });
        });
      } catch (e) {
        errorHandler(res, e);
      }
      // if login already use send 409 Error to client
    } else {
      res.status(409).json({
        message: "This login has already use. Try another login",
      });
    }
  });
};

//login user
module.exports.logInUser = (req, res) => {
  const body = req.body;
  if (
    body.hasOwnProperty("_id") &&
    body.hasOwnProperty("login") &&
    body.hasOwnProperty("password")
  ) {
    User.findOne({ login: req.body.login }).then((candidate) => {
      if (!candidate) {
        // if login absend in DB send 404 error
        res.status(404).send("Has no users whith this login, try another");
      } else {
        const passwordResult = bcryptjs.compareSync(
          body.password,
          candidate.password
        );
        if (passwordResult) {
          // passwords consided, create JWT
          const token = jwt.sign(
            {
              login: candidate.login,
              userId: candidate._id,
            },
            process.env.JWT,
            { expiresIn: 60 * 60 }
          );
          res.send({ data: `Bearer ${token}` });
          // passwords not consided, send 401 error
        } else {
          res.status(401).send("Passwords not conside, try again");
        }
      }
    });
  }
};
