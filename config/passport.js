const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('users');  // same as const User = require('../../models/User');
const keys = require('../config/keys');

// options to extract token
const opts = {};  
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
    // jwt_payload will contain decrypted payload
    //console.log(jwt_payload);
    User.findById(jwt_payload.id)
      .then( user => {
        if (user) {
          return done(null, user);  // return user object
        }
        return done (null, false);  // can't find user
      })
      .catch (err=> console.log(err))
  }))
}