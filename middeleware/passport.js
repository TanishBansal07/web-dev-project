    const passport = require("passport");
    const LocalStrategy = require("passport-local").Strategy;
    const userController = require("../controller/userController");
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        let user = userModel.findOne(email);
        if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
        }
        if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    }
    ));

    passport.serializeUser(function(user, done) {
    done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
    let user = userModel.findById(id);
    done(null, user);
    });
    function isauthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
    }

    module.exports = { passport, isauthenticated };

