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

const validateId = (id) => {
  const { error } = schemas.idSchema.validate(id);
  if (error) return { type: error.details[0].type, message: 'please enter a valid id' };
  return { type: null, message: '' };
};

module.exports = {
  validateLogin,
  userCreate,
  validateId,
};