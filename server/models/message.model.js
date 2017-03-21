var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userEmail: String,
    content: {
        type: String,
    },
    title: String,
    topic: {type: mongoose.Schema.Types.ObjectId, ref: 'Topic'},
    micId: {type: mongoose.Schema.Types.ObjectId, ref: 'Microphone'},
    createdAt: {
      type: Date,
      default: Date.now
    },
});

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
