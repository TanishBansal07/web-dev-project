let database = require("../database");
let passport = require("../middeleware/passport").passport;
let LocalStrategy = require("passport-local").Strategy;
let userModel = require("../database").userModel;
let session = require("express-session");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: passport.authenticate('local', {
    successRedirect: '/reminders',
    failureRedirect: '/login',
    failureFlash: true
  }),


  registerSubmit: (req, res) => {
    let user = {
      id: database.database.length + 1,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      reminders: [],
    };
    database.database.push(user);
    res.redirect("/login");
  },
};

module.exports = authController;
