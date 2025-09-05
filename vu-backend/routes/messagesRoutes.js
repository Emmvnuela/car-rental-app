const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Créer un message
router.post('/', messageController.createMessage);

// Obtenir tous les messages d'une room
router.get('/room/:roomId', messageController.getMessagesByRoomId);

module.exports = router;
