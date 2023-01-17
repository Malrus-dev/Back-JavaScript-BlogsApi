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

const validateName = (name) => {
  const text = '"name" is required';
  const { error } = schemas.nameSchema.validate(name);
  if (error) return { type: 'INVALID_VALUE', message: text };
  return { type: null, message: '' };
};

const validateBlogPost = (obj) => {
  const text = 'Some required fields are missing';
  const { error } = schemas.blogPostSchema.validate(obj);
  if (error) return { type: 'INVALID_VALUE', message: text };
  return { type: null, message: '' };
};

const validateBlogEditPost = (obj) => {
  const text = 'Some required fields are missing';
  const { error } = schemas.blogPostEditSchema.validate(obj);
  if (error) return { type: 'INVALID_VALUE', message: text };
  return { type: null, message: '' };
};

module.exports = {
  validateLogin,
  userCreate,
  validateId,
  validateName,
  validateBlogPost,
  validateBlogEditPost,
};