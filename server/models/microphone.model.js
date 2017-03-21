var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MicrophoneSchema = new Schema({
    manufacturer: String,
    model: String,
    pickupPatterns: String,
    type: String,
    impedance: String,
    pads: String,
    filters: String,
    phantomPower: String,
    image: String,
    splNoise: String,
    description: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
});

var Microphone = mongoose.model('Microphone', MicrophoneSchema);
module.exports = Microphone;
