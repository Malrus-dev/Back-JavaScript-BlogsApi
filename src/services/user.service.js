const { User } = require('../models');
const { userCreate } = require('../validations/validateInput');

const getEmail = (email) => User.findOne({ where: { email } });

const insert = async (msgUser) => {
    const validationResult = await userCreate(msgUser);
    if (validationResult.type) {
      return validationResult;
    }
    const userByEmail = await User.findOne({ where: { email: msgUser.email } });
    console.log('userByEmail', userByEmail);
    console.log(userByEmail !== undefined);
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
    // console.log(usersWithoutPasswords);
    return { type: null, message: usersWithoutPasswords };
  };

module.exports = {
  getEmail,
  insert,
  getAll,
};