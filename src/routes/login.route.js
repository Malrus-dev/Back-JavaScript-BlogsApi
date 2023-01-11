const express = require('express');
const loginController = require('../controllers/login.controller');

const Login = express.Router();

Login.post('/', loginController.login);

module.exports = Login;