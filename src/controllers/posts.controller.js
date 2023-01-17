const postsService = require('../services/posts.service');
const errorMap = require('../utils/errorMap');

const insert = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const msgUser = { title, content, categoryIds };
    const { authorization } = req.headers;

    const { type, message } = await postsService.insert(msgUser, authorization);
    if (type) {
      return res.status(errorMap.mapError(type)).json({ message });
    }
    return res.status(201).json(message);
    // return res.status(201).json(message);
  };

  const getAll = async (_req, res) => {
    const { message } = await postsService.getAll();
    return res.status(200).json(message);
  };

  const getById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await postsService.getById(id);
    if (type) {
      return res.status(errorMap.mapError(type)).json({ message });
    }
    return res.status(200).json(message);
  };

module.exports = {
  insert,
  getAll,
  getById,
};