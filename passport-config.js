const { Strategy, ExtractJwt } = require("passport-jwt");
const salt = "thisisthesecretingredient";
const models = require("./models");
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //this requires token in headers
  secretOrKey: salt,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      await models.Author.findOne({ where: { email: payload.email } })
        .then((user) => {
          //success - the user is found
          if (user.validatePassword(payload.password)) {
            return done(null, {
              id: user.id,
              name: user.name,
              email: user.email
            });
          } else {
            return done(null, false, { message: "incorrect password." })
          }
        })
        .catch((error) => {
          //error - user is not found
          console.error(error);
          return done(null, false);
        });
    })
  );
};
