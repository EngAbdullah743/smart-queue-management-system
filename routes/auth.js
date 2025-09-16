const express = require('express');
const router = express.Router();
const users = require('../config/users');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    return res.redirect(user.redirect); // Send them to their personal page
  } else {
    return res.status(401).send('Invalid email or password');
  }
});

module.exports = router;
