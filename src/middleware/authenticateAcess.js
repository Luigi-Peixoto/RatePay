const session = require('express-session');
const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado!' });
  }
  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    console.log(req.user.id)
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido!' });
  }
};

const authAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(401).json({ message: 'Acesso negado!' });
  }
  next();
};

module.exports = {
  authenticateToken,
  authAdmin
}