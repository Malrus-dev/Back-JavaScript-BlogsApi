const express = require('express');
const categoriesController = require('../controllers/categories.controller');
const tokenValidationMiddleware = require('../middlewares/tokenValidationMiddleware');

const Categories = express.Router();

Categories.post('/', tokenValidationMiddleware, categoriesController.insert);
Categories.get('/', tokenValidationMiddleware, categoriesController.getAll);

module.exports = Categories;