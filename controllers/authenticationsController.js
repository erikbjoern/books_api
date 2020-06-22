const jwt = require("jsonwebtoken")
const salt = "thisisthesecretingredient"

const authenticationsController = {
  async login(req, res) {
    const payload = req.body
    const token = jwt.sign(payload, salt, { expiresIn: 3600 } )
    res.send({ token: `Bearer ${token}` })
  }
}

module.exports = authenticationsController