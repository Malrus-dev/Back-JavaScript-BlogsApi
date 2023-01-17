const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ email: userWithoutPassword }, JWT_SECRET, jwtConfig);
  return token;
};

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, JWT_SECRET);
    return payload;
  } catch (error) {
    return { isError: true, error };
  }
};

const cathUserFromToken = async (authorization) => {
  try {
    const decoded = jwt.verify(authorization, JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });
    let userWithoutPassword;
    if (user) {
      const { dataValues } = user;
      userWithoutPassword = dataValues;
      delete userWithoutPassword.password;
    }
    if (!user) {
      return ({ type: 'UNAUTHORIZED', message: 'Erro ao procurar usuário do token.' });
    }
    return ({ ...userWithoutPassword });
  } catch (err) {
    return { type: 'UNAUTHORIZED', message: err.message };
  }
};

module.exports = {
  createToken,
  verifyToken,
  cathUserFromToken,
};