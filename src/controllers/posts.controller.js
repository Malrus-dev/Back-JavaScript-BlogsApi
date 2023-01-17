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
  };

  const getPostsUser = async (req, res) => {
    const { authorization } = req.headers;
    const { type, message } = await postsService.getPostsUser(authorization);
    if (type) {
      return res.status(errorMap.mapError(type)).json({ message });
    }
    return res.status(200).json(message);
  };

  const getPostById = async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { type, message } = await postsService.getPostById(id, authorization);
    if (type) {
      return res.status(errorMap.mapError(type)).json({ message });
    }
    res.status(200).json(message);
  };

  const changePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const { authorization } = req.headers;
    const data = { title, content, id };
    const { type, message } = await postsService.changePost(data, authorization);
    if (type) {
      return res.status(errorMap.mapError(type)).json({ message });
    }
    res.status(200).json(message);
  };

module.exports = {
  insert,
  getPostsUser,
  getPostById,
  changePost,
};