var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    title: {
        type: String,
    },
    category: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
});

var Topic = mongoose.model('Topic', TopicSchema);
module.exports = Topic;
