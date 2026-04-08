const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const Notification = require('../models/Notification');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    
    // Delete user's notifications and orders to prevent foreign key constraint issues
    await Notification.destroy({ where: { user_id: userId } });
    await Order.destroy({ where: { user_id: userId } });
    
    // Finally, delete the user
    await user.destroy();
    
    res.json({ message: "Compte utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
