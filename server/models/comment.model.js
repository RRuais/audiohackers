var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userEmail: String,
    messageId: {type: mongoose.Schema.Types.ObjectId, ref: 'Message'},
    content: {
        type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
