const Joi = require('joi');

const objFieldsMissing = {
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
};

const CATEGORY_NOT_FOUND = { 'array.min': 'one or more "categoryIds" not found' };

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

const idSchema = Joi.number().integer().min(1).required();

const nameSchema = Joi.object({ name: Joi.string().min(1).required() });

const blogPostSchema = Joi.object(
  { 
    title: Joi.string().min(1).required().messages(objFieldsMissing),
    content: Joi.string().min(1).required().messages(objFieldsMissing),
    categoryIds: Joi.array().min(1).required().messages(CATEGORY_NOT_FOUND),
  },
);

module.exports = {
  loginSchema,
  userCreateSchema,
  idSchema,
  nameSchema,
  blogPostSchema,
};