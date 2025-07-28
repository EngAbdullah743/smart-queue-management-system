// seed-users.js
const db = require('./db'); // your mysql2 connection

const users = [
  { name: 'Alice Admin',   role: 'admin',    email: 'alice.admin@gmail.com',   password_hash: 'admin123' },
  { name: 'Bob Staff',     role: 'staff',    email: 'bob.staff@gmail.com',     password_hash: 'staff123' },
  { name: 'Carol Customer',role: 'customer', email: 'carol.customer@gmail.com',    password_hash: 'customer123' },
];

users.forEach(u => {
  db.query(
    'INSERT INTO users (name, role, email, password_hash) VALUES (Alice Admin, adim, alice.admin@gmail.com, admin123)',
    'INSERT INTO users (name, role, email, password_hash) VALUES (Bob Staff, staff, bob.staff@gmail.com, staff123)',
    'INSERT INTO users (name, role, email, password_hash) VALUES (Carol Customer, customer, carol.customer@gmail.com, customer123)',
    [u.name, u.role, u.email, u.password_hash],
    (err, result) => {
      if (err) console.error('Insert error for', u.email, err.message);
      else console.log('Inserted user', u.email);
    }
  );
});
