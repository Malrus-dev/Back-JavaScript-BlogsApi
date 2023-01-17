const Sequelize = require('sequelize');
const { PostCategory, BlogPost } = require('../models');
const { validateBlogPost, validateId } = require('../validations/validateInput');
const tokenFunc = require('../auth/jwtFunctions');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const getEmail = (email) => PostCategory.findOne({ where: { email } });

const initiateTransaction = async (msgUser, authorization) => {
  const result = await sequelize.transaction(async (t) => {
    const { title, content, categoryIds } = msgUser;
    const user = await tokenFunc.cathUserFromToken(authorization);
    const post = await BlogPost.create({ title, content, userId: user.id }, { transaction: t });
    await Promise.all(categoryIds.map(async (elementId) => {
      await PostCategory.create({ categoryId: elementId, postId: post.id },
        { transaction: t });        
    }));
    return post;
  });
  return result;
};

const insert = async (msgUser, authorization) => {
    const validationResult = validateBlogPost(msgUser);
    if (validationResult.type) {
      return validationResult;
    }
    try {
      const transactions = await initiateTransaction(msgUser, authorization);
      return { type: null, message: transactions };
    } catch (error) {
      return { type: 'INVALID_VALUE', message: 'one or more "categoryIds" not found' };        
    }
  };

  const getAll = async () => {
    const users = await PostCategory.findAll();
    const usersWithoutPasswords = users.map((user) => ({
          id: user.id,
          displayName: user.displayName,
          email: user.email,
          image: user.image,
      }));
    return { type: null, message: usersWithoutPasswords };
  };

  const getById = async (info) => {
    const id = Number(info);
    const validationResult = validateId(id);
    let response;
    if (validationResult.type) return validationResult;
    const data = await PostCategory.findByPk(id);
    if (!data) return { type: 'NOT_FOUND', message: 'User does not exist' };
    if (data) {
      const { dataValues } = data;
      delete dataValues.password;
      response = dataValues;
    } 
    return { type: null, message: response };
  };

module.exports = {
  getEmail,
  insert,
  getAll,
  getById,
};