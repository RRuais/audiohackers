'use strict';

const passport = require('passport');
const config = require('./config.js');
const localStrategy = require('passport-local').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const users = require('../controllers/user.controller');



module.exports = function() {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    passport.use(new facebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            profileFields: ['id', 'email', 'first_name', 'last_name'],
            enableProof: true,
        },
        function(accessToken, refreshToken, profile, done) {
          users.saveOAuthUserProfile(accessToken, refreshToken, profile, done)
        }
    ));

};
