const { User } = require('../models');
const { userCreate, validateId } = require('../validations/validateInput');
const tokenFunc = require('../auth/jwtFunctions');

const getEmail = (email) => User.findOne({ where: { email } });

const insert = async (msgUser) => {
    const validationResult = await userCreate(msgUser);
    if (validationResult.type) {
      return validationResult;
    }
    const userByEmail = await User.findOne({ where: { email: msgUser.email } });
    if (userByEmail) {
      return { type: 'CONFLICT', message: 'User already registered' };
    }
    const addUser = await User.create(msgUser);
    return { type: null, message: addUser };
  };

  const getAll = async () => {
    const users = await User.findAll();
    const usersWithoutPasswords = users.map((user) => ({
          id: user.id,
          displayName: user.displayName,
          email: user.email,
          image: user.image,
      }));
    return { type: null, message: usersWithoutPasswords };
  };

  const getById = async (info) => {
    const id = Number(info);
    const validationResult = validateId(id);
    let response;
    if (validationResult.type) return validationResult;
    const data = await User.findByPk(id);
    if (!data) return { type: 'NOT_FOUND', message: 'User does not exist' };
    if (data) {
      const { dataValues } = data;
      delete dataValues.password;
      response = dataValues;
    } 
    return { type: null, message: response };
  };

  const deleteUser = async (authorization) => {
    try {
      const user = await tokenFunc.cathUserFromToken(authorization);
      if (user.type) return user;
      await User.destroy({ where: { id: user.id } });
      return { type: null, message: 'User deleted' };
    } catch (error) {
      return { type: 'ERROR', message: error };  
    }
  };

module.exports = {
  getEmail,
  insert,
  getAll,
  getById,
  deleteUser,
};