// utils/hash.js
const bcrypt = require('bcrypt');

// 1) Define hashPassword
const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

// 2) Define comparePassword
const comparePassword = async (plainText, hash) => {
  return bcrypt.compare(plainText, hash);
};

// 3) Export both functions
module.exports = { hashPassword, comparePassword };
