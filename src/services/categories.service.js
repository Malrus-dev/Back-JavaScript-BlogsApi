const { Category } = require('../models');
const { validateName } = require('../validations/validateInput');

const insert = async (msgUser) => {
    const validationResult = validateName(msgUser);
    if (validationResult.type) {
      return validationResult;
    }
    const addCategory = await Category.create(msgUser);
    return { type: null, message: addCategory };
  };

  const getAll = async () => {
    const categories = await Category.findAll();
     return { type: null, message: categories };
  };

module.exports = {
  insert,
  getAll,
};