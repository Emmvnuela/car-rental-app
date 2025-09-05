const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/send', chatController.sendMessage);
router.get('/room/:roomId/messages', chatController.getMessagesByRoom);

module.exports = router;
