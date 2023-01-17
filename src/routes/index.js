const express = require('express');
const loginRoutes = require('./login.route');
const userRoutes = require('./user.route');
const categoriesRoutes = require('./categories.route');
const postsRoutes = require('./posts.route');

const routes = express.Router();

routes.use('/login', loginRoutes);
routes.use('/user', userRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/post', postsRoutes);

module.exports = routes;