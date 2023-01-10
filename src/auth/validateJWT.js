const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('decoded', decoded);
    const user = await User.findByPk(decoded.data.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};