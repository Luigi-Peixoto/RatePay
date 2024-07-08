function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    return res.send('<script>alert("Você precisa estar logado"); window.location.href = "/login"; </script>');
  }
}

const isEmployee = (req, res, next) => {
  if (!req.session.user || (req.session.user.role !== 'EMPLOYEE' && req.session.user.role !== 'ADMIN')) {
    return res.send('<script>alert("ACESSO NEGADO"); window.location.href = "/"; </script>');
  }
  next();
}

const isAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'ADMIN') {
    return res.send('<script>alert("ACESSO NEGADO"); window.location.href = "/"; </script>');
  }
  next();
};

const allowed = (req, res, next) => {
  const customHeader = req.headers['x-check-header'];
  if(customHeader === process.env.SECRETHEADER){
    return next();
  }else if (!req.session.user || (req.session.user.role !== 'EMPLOYEE' && req.session.user.role !== 'ADMIN')) {
    return res.status(400).json({message: 'não bateu o cargo'})
  }
  return next();
};

module.exports = {
  isAuthenticated,
  isEmployee,
  isAdmin,
  allowed
}