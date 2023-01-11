const express = require('express');
const loginRoutes = require('./login.route');
const userRoutes = require('./user.route');

const routes = express.Router();

routes.use('/login', loginRoutes);
routes.use('/user', userRoutes);

module.exports = routes;