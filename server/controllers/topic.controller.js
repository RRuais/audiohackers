var Message = require('mongoose').model('Message');
var Comment = require('mongoose').model('Comment');
var Topic = require('mongoose').model('Topic');


module.exports.postTopic = function(req, res) {
    console.log(req.body);
    Topic.create(req.body)
        .then(function(topic) {
            res.status(201).json(topic)
        })
        .catch(function(err) {
            res.status(500).json(err);
        })
};

module.exports.getTopics = function(req, res) {
    Topic.find({}).then(function(topics) {
        res.status(201).json(topics)
    }).catch(function(err) {
        res.status(400).json(err);
    })
};

module.exports.getMessagesFromTopic = function(req, res) {
  console.log(req.params);
  Message.find({topic: req.params.id}).then(function(messages) {
      res.status(201).json(messages)
  }).catch(function(err) {
      res.status(400).json(err);
  })
};

module.exports.deleteTopic = function(req, res) {
    Topic.findByIdAndRemove(req.params.topicId)
        .then(function(response) {
            Message.remove({topic: req.params.topicId})
              .then(function(response) {
                res.status(200).json({message: "Successfully deleted comment"})
              })
        }).catch(function(err) {
            res.status(500);
            res.json({message: "Failed to delete comment"});
        });
};
