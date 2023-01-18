const express = require('express');
const userController = require('../controllers/user.controller');
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');

const User = express.Router();

User.post('/', userController.insert);
User.get('/', tokenValidationMiddleware, userController.getAll);
User.get('/:id', tokenValidationMiddleware, userController.getById);
User.delete('/me', tokenValidationMiddleware, userController.deleteUser);

module.exports = User;