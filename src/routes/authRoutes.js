var express = require('express');
var authRouter = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

var router = function(User) {
  authRouter.route('/signUp')
    .post(function(req, res) {
      var user = new User(req.body);

      user.save(function(err) {
        if (err) {
          console.log(err);
          res.redirect('/');
        } else {
          res.redirect('/profile');
        }
      });
    });

  authRouter.route('/signIn')
    .post(passport.authenticate('local', {
      failureRedirect: '/'
    }), function(req, res) {
      res.redirect('/auth/profile');
    });

  authRouter.route('/profile')
    .all(function(req, res, next) {
      if (!req.user) {
        console.log(req.user);
        res.redirect('/');
      } else {
        next();
      }
    })
    .get(function(req, res) {
      res.redirect('/profile');
    });
  return authRouter;
};

module.exports = router;
