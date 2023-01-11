const categoriesService = require('../services/categories.service');
const errorMap = require('../utils/errorMap');

const insert = async (req, res) => {
    const { name } = req.body;
    const { type, message } = await categoriesService.insert({ name });
    if (type) {
      return res.status(errorMap.mapError(type)).json({ message });
    }
    return res.status(201).json(message);
  };

  const getAll = async (_req, res) => {
    const { message } = await categoriesService.getAll();
    return res.status(200).json(message);
  };

module.exports = {
  insert,
  getAll,
};