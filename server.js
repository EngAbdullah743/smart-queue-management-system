const express = require('express');
const path = require('path');
const config = require('./config');

const app = express();
const PORT = 3005;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/queue', require('./routes/queue'));
app.use('/api/queue/:id', require('./routes/queue'));
app.use('/api/users', require('./routes/users'));


// Sample API to get queue entries
app.get('/api/queue', (req, res) => {
  db.query(
    'SELECT * FROM queues ORDER BY created_at DESC',
     (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
// 3) Start listening (after middleware/routes)



// 4) Log listen errors (optional)
server.on('error', (err) => {
  console.error('🔴 Listen error:', err.message);
  process.exit(1);
});
// user page route
app.get('/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User not found');

  res.send(`<h1>Welcome ${user.email}!</h1>`);
});

const User = require('./models/schema'); // or wherever your model is

app.get('/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User not found');

  // you can also res.sendFile a static HTML page here
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Welcome</title></head>
      <body>
        <h1>Welcome, ${user.email}!</h1>
        <p>This is your dashboard.</p>
      </body>
    </html>
  `);
});

const authRoutes = require('./routes/auth');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRoutes);  // Connect login route

app.listen(PORT,  () => {
  console.log('Server running on ${PORT}');
});
