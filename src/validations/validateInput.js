const schemas = require('./schemas');

const validateLogin = async (email, password) => {
  const { error } = schemas.loginSchema.validate({ email, password });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const userCreate = async (obj) => {
  const { error } = schemas.userCreateSchema.validate(obj);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateLogin,
  userCreate,
};