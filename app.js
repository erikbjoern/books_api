const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors")
const passport = require("passport")
// const LocalStrategy = require("passport-local").Strategy   //This is used for email + password confirmation

const books = require('./routes/books');
const authentication = require('./routes/authentication')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors())
app.use(passport.initialize)

require('./passport-config')(passport)

app.use('/api/v1/books', books); //passport.authenticate("jwt", { session: false }, )
app.use('/api/v1/auth', authentication)

module.exports = app;
