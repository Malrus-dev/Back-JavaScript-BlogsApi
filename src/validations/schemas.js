const Joi = require('joi');

const objFieldsMissing = {
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
};

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages(objFieldsMissing),
  password: Joi.string()
    .min(6)
    .required()
    .messages(objFieldsMissing),
});

const userCreateSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages(objFieldsMissing),
  displayName: Joi.string()
    .min(8)
    .required()
    .messages(objFieldsMissing),
  password: Joi.string()
    .min(6)
    .required()
    .messages(objFieldsMissing),
  image: Joi.string(),    
});

module.exports = {
  loginSchema,
  userCreateSchema,
};