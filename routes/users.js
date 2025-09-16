const express = require('express');
const router  = express.Router();
const user = require('../models/schema');
const { comparePassword } = require('../utils/hash');


router.get('/', (req, res) => {
  db.query('SELECT id, name, role, email, created_at FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'invalid email or password' });


    // 2. Compare submitted password with hashed password in database
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid password' });

    // 3. Success! Send back the user's role so frontend can redirect
 return res.json({ redirect: `/user/${user._id}` });
  });



module.exports = router;
