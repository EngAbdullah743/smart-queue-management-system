
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET queue entries
router.get('/', (req, res) => {
  db.query(
    'SELECT * FROM queues ORDER BY created_at DESC',
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// POST new queue entry
router.post('/', (req, res) => {
  const { user_id, service } = req.body;
  db.query(
    'INSERT INTO queues (user_id, service) VALUES (?, ?)',
    [user_id, service],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId });
    }
  );
});

module.exports = router
