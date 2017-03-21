var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    name: {
        type: String
    },
    birthday: {
      type: Date
    },
    image: {
      type: String,
      default: "/app/assets/images/emptyPhoto.png"
    },
    authToken: {
      type: String
    },
    isAdmin: false,
    fbId: String,
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

var User = mongoose.model('User', UserSchema);
module.exports = User;

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};


module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) {
          callback(err, null)
        }
        callback(null, isMatch);
    })
}
