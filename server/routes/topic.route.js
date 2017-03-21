var express = require('express');
var router = express.Router();
var topicController = require('../controllers/topic.controller.js')


router.get('/', topicController.getTopics);
router.post('/', topicController.postTopic);
router.get('/getMessagesFromTopic/:id', topicController.getMessagesFromTopic);
router.delete('/:topicId', topicController.deleteTopic);


module.exports = router;
