const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/setup — One-time admin account creation (protected by setup key)
router.post('/setup', async (req, res) => {
  try {
    const { username, password, setupKey } = req.body;

    // Verify the setup key from .env
    if (setupKey !== process.env.ADMIN_SETUP_KEY) {
      return res.status(403).json({ error: 'Invalid setup key' });
    }

    // Check if admin already exists
    const existing = await Admin.findOne();
    if (existing) {
      return res.status(400).json({ error: 'Admin account already exists. Use /login instead.' });
    }

    const admin = await Admin.create({ username, password });
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ message: 'Admin account created', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/verify — Check if current token is valid
router.get('/verify', auth, (req, res) => {
  res.json({ valid: true });
});

module.exports = router;
