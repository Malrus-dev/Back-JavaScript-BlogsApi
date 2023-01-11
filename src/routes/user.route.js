const express = require('express');
const userController = require('../controllers/user.controller');

const User = express.Router();

User.post('/', userController.insert);

module.exports = User;