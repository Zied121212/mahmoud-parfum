const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Notification = require('../models/Notification');

router.post('/', async (req, res) => {
  try {
    const { userId, totalAmount, orderDetails } = req.body;

    if (!userId || !totalAmount || !orderDetails) {
      return res.status(400).json({ message: "Données incomplètes pour la commande." });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé. Impossible de valider la commande." });
    }

    const newOrder = await Order.create({
      user_id: user.id,
      totalAmount,
      orderDetails,
    });

    res.json({ message: "Commande validée avec succès !", orderId: newOrder.id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: User, attributes: ['email', 'fullName'] }],
      order: [['orderDate', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/orders/pending/count
router.get('/pending/count', async (req, res) => {
  try {
    const count = await Order.count({ where: { status: 'PENDING' } });
    res.json({ count });
  } catch (error) {
    console.error("Error fetching pending order count:", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/orders/:id/status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['PENDING', 'CONFIRMED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ message: "Statut invalide" });
    }
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Commande introuvable" });
    
    order.status = status;
    await order.save();
    
    // Add Notification logic here
    const message = `Votre commande #${order.id} a été ${status === 'CONFIRMED' ? 'confirmée. Elle est en préparation' : 'rejetée'}.`;
    await Notification.create({
      user_id: order.user_id,
      message
    });

    res.json({ message: "Statut mis à jour", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
