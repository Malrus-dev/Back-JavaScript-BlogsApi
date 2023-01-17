const Sequelize = require('sequelize');
const { PostCategory, BlogPost, User, Category } = require('../models');
const { validateBlogPost } = require('../validations/validateInput');
const tokenFunc = require('../auth/jwtFunctions');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const getEmail = (email) => PostCategory.findOne({ where: { email } });

const findOptions = (id) => ({ 
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    where: { userId: id },
  });

const initiateTransaction = async (msgUser, authorization) => {
  const result = await sequelize.transaction(async (t) => {
    const { title, content, categoryIds } = msgUser;
    const user = await tokenFunc.cathUserFromToken(authorization);
    if (user.type) return user;
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
      if (transactions.type) return transactions;
      return { type: null, message: transactions };
    } catch (error) {
      return { type: 'INVALID_VALUE', message: 'one or more "categoryIds" not found' };        
    }
  };

  const getPostsUser = async (authorization) => {
    const user = await tokenFunc.cathUserFromToken(authorization);
    if (user.type) return user;
    const allPosts = await BlogPost.findAll(findOptions(user.id));
    return { message: allPosts };
  };

module.exports = {
  getEmail,
  insert,
  getPostsUser,
};