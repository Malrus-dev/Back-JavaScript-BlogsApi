const loginService = require('../services/login.service');
const errorMap = require('../utils/errorMap');
const generateToken = require('../auth/jwtFunctions');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await loginService.login(email, password);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  const token = generateToken.createToken(email);
  return res.status(200).json({ token });
};

/* const insert = async (req, res) => {
    const { email, password, displayName } = req.body;
    const msgUser = { email, password, displayName };

    const { type, message } = await loginService.insert(msgUser);
    if (type) {
      return res.status(errorMap.mapError(type)).json({ message });
    }
    return res.status(201).json(message);
  }; */

module.exports = {
  login,
};