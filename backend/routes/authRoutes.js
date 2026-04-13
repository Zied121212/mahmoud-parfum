const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { fullName, password, phone } = req.body;
    const email = req.body.email.trim().toLowerCase();
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Un utilisateur avec cet email existe déjà." });
    }

    const newUser = await User.create({ fullName, email, password, phone });
    
    const userToReturn = {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email
    };
    
    res.status(201).json(userToReturn);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription.", error: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { password } = req.body;
    const email = req.body.email.trim().toLowerCase();
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    if (user.password !== password) {
       return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }
    
    const userToReturn = {
        id: user.id,
        fullName: user.fullName,
        email: user.email
    };

    res.status(200).json(userToReturn);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion.", error: error.message });
  }
});

module.exports = router;
