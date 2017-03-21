var config = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    //Load models
    require('../models/user.model');
    require('../models/topic.model');
    require('../models/message.model');
    require('../models/comment.model');
    require('../models/microphone.model');

    return db;
};
