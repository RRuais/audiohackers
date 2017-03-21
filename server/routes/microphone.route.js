var express = require('express');
var router = express.Router();
var microphoneController = require('../controllers/microphone.controller.js')


router.get('/', microphoneController.getAllMicrophones);
router.get('/:id', microphoneController.getMicById)
router.post('/', microphoneController.postMicrophone);
router.delete('/:micId', microphoneController.deleteMicrophone);
router.patch('/update', microphoneController.updateMicrophone);



module.exports = router;
