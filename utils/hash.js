const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = async (plainText, hash) => {
  return bcrypt.compare(plainText, hash);
};

module.exports = { hashPassword, comparePassword };
