const { User } = require('../models');
const { validateLogin } = require('../validations/validateInput');

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

/* const insert = async (msgUser) => {
    const validationResult = validateLogin(msgUser);
    if (validationResult.type) return validationResult;
    let addUser;
    try {
      addUser = await User.create(msgUser);
    } catch (error) {
      console.log(error);
    }
    return { type: null, message: addUser };
  }; */

module.exports = {
  getEmail,
  login,
};