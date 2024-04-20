const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController");
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);
// - [ ]  Authenticated users should not be able to see other authenticated users reminders. Only their own.
// - [ ]  Authenticated users should not be able to change other authenticated users reminders. Only their own.
// - [ ]  Authenticated users should not be able to delete other authenticated users reminders.
// - [ ]  You must include the ability for users to Login using Email & Password
// - [ ]  You must include the ability for ADMINS to remotely destroy a session.
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});
function isauthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = { passport, localLogin, isauthenticated };

