// utils/validator.js
function isEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function isNonEmptyString(str) {
  return typeof str === 'string' && str.trim().length > 0;
}

module.exports = { isEmail, isNonEmptyString };
