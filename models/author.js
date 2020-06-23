'use strict';
const bcrypt = require("bcryptjs")

const encryptPassword = password => {
  return new Promise( (resolve, reject) => {
    bcrypt.genSalt(10,  (err, salt) => {
      if (err) return reject(err)
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return reject(err)
        return resolve(hash)
      })
    })
  })
}

module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Author.associate = function(models) {
    // associations can be defined here
  };
  Author.beforeCreate(async author => {
    const password = await encryptPassword(author.password)
    author.password = password
  })
  Author.prototype.validatePassword = function (password) {  //traditional function in order to get access to the prototype as 'this'
    return bcrypt.compareSync(password, this.password)
  }
  return Author;
};