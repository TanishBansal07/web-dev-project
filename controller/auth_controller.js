let database = require("../database");
let passport = require("passport")
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

  loginSubmit: (req, res) => {

    let user = userModel.findOne(req.body.email);
    if (user) {
      if (user.password === req.body.password) {
        req.session.user = user;
        res.redirect("/reminders");
      } else {
        res.render("auth/login", {
          error: "Your login details are not valid. Please try again",
        });
      }
    } else {
      res.render("auth/login", {
        error: "Your login details are not valid. Please try again",
      });
    }

  },

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
