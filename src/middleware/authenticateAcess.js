const session = require('express-session');

const authLogin = (req, res, next) => {
    const user = req.session.user || null;
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'Acesso negado!' });
    }

    next();
};

const authAdmin = (req, res, next) => {
    const user = req.session.user || null;
  
    if (!user) {
      return res.redirect("/auth/login");
    }

    if (user.session.user.role != "ADMIN") {
        return res.status(401).json({ message: 'Acesso negado!' });
    }
    
    next();
};

module.exports = {
    authLogin,
    authAdmin
}