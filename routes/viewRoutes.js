const express = require('express');
const router = express.Router();

// Rota para a página de usuários
router.get('/usuarios', async (req, res) => {
  try {
    const users = await User.find();
    res.render('user', { users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
