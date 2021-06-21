const JwtStartegy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../db/models/users/user");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT,
};

module.exports = (passport) => {
  passport.use(
    new JwtStartegy(options, (payload, done) => {
      try {
        User.findById(payload.userId)
          .select("login _id")
          .then((result) => {
            if (result) {
              done(null, result);
            } else {
              done(null, false);
            }
          });
      } catch (e) {
        console.log(e);
      }
    })
  );
};
