const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ data: userWithoutPassword }, JWT_SECRET, jwtConfig);
  return token;
};

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, JWT_SECRET);
    console.log('verifytoken', payload);
    return payload;
  } catch (error) {
    return { isError: true, error };
  }
};

module.exports = {
  createToken,
  verifyToken,
};