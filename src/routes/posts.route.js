const express = require('express');
const postsController = require('../controllers/posts.controller');
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');

const Posts = express.Router();

Posts.post('/', tokenValidationMiddleware, postsController.insert);
Posts.get('/', tokenValidationMiddleware, postsController.getPostsUser);

module.exports = Posts;