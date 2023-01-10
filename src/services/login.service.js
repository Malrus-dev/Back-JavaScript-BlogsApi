const { User } = require('../models');
const validate = require('../validations/validateInput');

const getEmail = (email) => User.findOne({ where: { email } });

const login = async (email, password) => {
  const error = await validate.validateLogin(email, password);
  if (error.type) return error;

  const user = await getEmail(email);

  if (!user || user.password !== password) {
    return { type: 'UNMATCHED_FIELDS', message: 'Invalid fields' };
  }

  return { type: null, message: user };
};

module.exports = {
  getEmail,
  login,
};