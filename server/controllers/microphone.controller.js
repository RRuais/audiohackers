var Microphone = require('mongoose').model('Microphone');
var mongoose = require('mongoose');

module.exports.postMicrophone = function(req, res) {
    Microphone.create(req.body)
        .then(function(mic) {
            res.status(201).json(mic)
        }).catch(function(err) {
            res.status(500).json(err);
        })
};

module.exports.getAllMicrophones = function(req, res) {
    Microphone.find({})
        .then(function(microphones) {
            res.status(200).json(microphones);
        }).catch(function(err) {
            res.status(500).json(err);
        })
};

module.exports.deleteMicrophone = function(req, res) {
    Microphone.findByIdAndRemove(req.params.micId)
        .then(function(response) {
            res.status(200).json({
                message: "Successfully deleted Microphone"
            })
        }).catch(function(err) {
            res.status(500);
            res.json({
                message: "Failed to delete Microphone"
            });
        });
};

module.exports.updateMicrophone = function(req, res) {
      var id = mongoose.Types.ObjectId(req.body._id);
      Microphone.findOneAndUpdate({_id: id}, req.body, {returnOriginal: false})
          .then(function(result) {
              res.status(200).json(result)
          }).catch(function(err) {
              res.status(500);
              res.json(err);
          });
};

module.exports.getMicById = function(req, res) {
  Microphone.find({_id: req.params.id})
      .then(function(microphone) {
          res.status(200).json(microphone);
      }).catch(function(err) {
          res.status(200).json({message: "No Microphone Found"});
      })
};
