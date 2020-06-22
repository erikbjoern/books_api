const Strategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const salt = "thisisthesecretingredient"
const models = require("./models")
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //this requires token in headers
  secretOrKey: salt
}

module.exports = (passport) => {
  passport.use(
    new Strategy(options, (payload, done) => {
      models.Author.findOne({ where: { name: payload.name }})
        .then(user => {
          //success - the user is found
          return done(null, {
            id: user.id,
            name: user.name
          })
        })
        .catch(error => {
          //error - user is not found
          console.error(error)
          return done(null, false)
        })
    })
  )
}