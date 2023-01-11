const { User } = require('../models');
const { validateLogin, userCreate } = require('../validations/validateInput');

const getEmail = (email) => User.findOne({ where: { email } });

const login = async (email, password) => {
  const error = await validateLogin(email, password);
  if (error.type) return error;

  const user = await getEmail(email);

  if (!user || user.password !== password) {
    return { type: 'UNMATCHED_FIELDS', message: 'Invalid fields' };
  }

  return { type: null, message: user };
};

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

module.exports = {
  getEmail,
  login,
  insert,
};