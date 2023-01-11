const generateToken = require('../auth/jwtFunctions');

let text = '';
let error = false;

const tokenInvalid = (verifyToken) => {
  if (verifyToken.isError && (verifyToken.error.toString().indexOf('invalid token') !== -1
    || verifyToken.error.toString().indexOf('jwt malformed') !== -1)) {
    error = true;
    text = 'Expired or invalid token'; 
  } 
};

const tokenNotFound = (verifyToken) => {
  if (verifyToken.isError && verifyToken.error.toString()
  .indexOf('jwt must be provided') !== -1) {
    error = true;
    text = 'Token not found';
  }
};

const tokenValidationMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    const verifyToken = generateToken.verifyToken(authorization);
    tokenInvalid(verifyToken);
    tokenNotFound(verifyToken);
    if (error === true) return res.status(401).json({ message: text });    
    next();
};

module.exports = tokenValidationMiddleware;
