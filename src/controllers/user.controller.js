// const { check, validationResult } = require('express-validator');
const userService = require('../services/user.service');
const errorMap = require('../utils/errorMap');
const generateToken = require('../auth/jwtFunctions');

const insert = async (req, res) => {
    const { email, password, displayName, image } = req.body;
    const msgUser = { email, password, displayName, image };
    const accWithoutPass = { displayName, email, image };

    const { type, message } = await userService.insert(msgUser);
    if (type) {
      return res.status(errorMap.mapError(type)).json({ message });
    }
    const token = generateToken.createToken(accWithoutPass);
    return res.status(201).json({ token });
    // return res.status(201).json(message);
  };

  const getAll = async (_req, res) => {
    const { message } = await userService.getAll();
    return res.status(200).json(message);
  };

  const getById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await userService.getById(id);
    if (type) {
      return res.status(errorMap.mapError(type)).json({ message });
    }
    return res.status(200).json(message);
  };

  const deleteUser = async (req, res) => {
    const { authorization } = req.headers;
    const { type, message } = await userService.deleteUser(authorization);
    if (type) {
      return res.status(errorMap.mapError(type)).json({ message });
    }
    return res.status(204).end();
  };

module.exports = {
  insert,
  getAll,
  getById,
  deleteUser,
};