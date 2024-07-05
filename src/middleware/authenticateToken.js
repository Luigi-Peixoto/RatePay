const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado!' });
  }

  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido!' });
  }
};

async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken) {
      return res.status(401).json({ message: 'Token de atualização não fornecido.' });
    }
  
    try {
      const refreshSecret = process.env.REFRESH_SECRET;
      const decoded = jwt.verify(refreshToken, refreshSecret);
  
      const user = await User.findById(decoded.id);
      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ message: 'Token de atualização inválido.' });
      }
  
      const accessToken = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '15m' });
  
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 15 * 60 * 1000
      });
  
      return res.status(200).json({ message: 'Token renovado com sucesso!' });
    } catch (error) {
      return res.status(403).json({ message: 'Token de atualização inválido ou expirado.' });
    }
  }
module.exports = { authenticateToken, refreshToken};