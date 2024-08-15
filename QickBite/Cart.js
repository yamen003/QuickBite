const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have an auth middleware
const User = require('../models/User'); // Assuming you have a User model

// Get cart items
router.get('/cart', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});

// Add item to cart
router.post('/cart', authMiddleware, async (req, res) => {
  const { item } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.cart.push(item);
    await user.save();
    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
});

// Remove item from cart by index
router.delete('/cart/:index', authMiddleware, async (req, res) => {
  const index = req.params.index;
  try {
    const user = await User.findById(req.user.id);
    user.cart.splice(index, 1);
    await user.save();
    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item from cart' });
  }
});

// Clear cart
router.delete('/cart', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart = [];
    await user.save();
    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart' });
  }
});

module.exports = router;
