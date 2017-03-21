var config = require('./config');
var express = require('express');
var session = require("express-session");
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var path = require('path');

module.exports = function() {

    var app = express();


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    app.use(cookieParser());
    app.use(session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    require('./passport.js')();

    var routes = require('../routes/index.route');
    var users = require('../routes/user.route');
    var messages = require('../routes/message.route');
    var comments = require('../routes/comment.route');
    var topics = require('../routes/topic.route');
    var microphones = require('../routes/microphone.route');

    app.use(express.static('public'));
    app.use(express.static('bower_components'));
    app.use('/uploads', express.static("uploads"));

    app.use('/', routes);
    app.use('/api/users', users);
    app.use('/api/messages', messages);
    app.use('/api/comments', comments);
    app.use('/api/topics', topics);
    app.use('/api/microphones', microphones);

    return app;
};
