const express = require('express');
const router = express.Router();
const User = require('F:/QuickBite Stage PRoject/QickBite/Items');  // Ensure this path is correct
const authMiddleware = require('../middleware/auth');

router.get('/api/user', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is added to req.user by the auth middleware
    const user = await User.findById(userId).select('name email'); // Fetch name and email in one query

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      nameuser: user.name,
      emailuser: user.email
    });
  } catch (error) {
    console.error('Error in /api/user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
