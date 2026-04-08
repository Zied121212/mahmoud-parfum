const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// GET /api/notifications/:userId
router.get('/:userId', async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { user_id: req.params.userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/notifications/:id/read
router.put('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification introuvable" });
    
    notification.isRead = true;
    await notification.save();
    res.json({ message: "Notification lue" });
  } catch (error) {
    console.error("Error updating notification status:", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/notifications/user/:userId/readAll
router.put('/user/:userId/readAll', async (req, res) => {
  try {
    await Notification.update(
      { isRead: true },
      { where: { user_id: req.params.userId, isRead: false } }
    );
    res.json({ message: "Toutes les notifications ont été lues" });
  } catch (error) {
    console.error("Error updating all notifications:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
