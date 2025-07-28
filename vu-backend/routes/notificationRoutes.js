const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authenticateToken = require('../middlewares/auth'); // middleware simple

router.get('/:userId/unread-count', authenticateToken, notificationController.countUnread);
router.get('/:userId', authenticateToken, notificationController.getNotifications);
router.put('/:id/read', authenticateToken, notificationController.markAsRead);
router.delete('/:id', authenticateToken, notificationController.deleteNotification);

module.exports = router;
