const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // replace with your MySQL username
  password: '',  
  database: 'smart_queue'     // this DB must already exist or create it manually
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.message);
  }
  else {
  console.log('Connected to MySQL smart_queue via WAMPServer.');
  }
});

module.exports = db;
