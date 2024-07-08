const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const {id} = req.params
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { username } = req.body;
 
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(403).send('<script>alert("Usuário não encontrado!"); window.location.href = "/"; </script>');
    }

    if (user.role !== 'ADMIN' && user.role !== req.session.user.role) {
      await User.deleteOne({ _id: user._id });
      return res.status(200).redirect('/');
    }
    
    return res.status(403).send('<script>alert("Você não tem permissão para deletar esse usuário!"); window.location.href = "/"; </script>');

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }]
    });

    if (user) {
      return res.status(400).send('<script>alert("Email ou username já existente!"); window.location.href = "/register"; </script>');
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({ name, username, email, password: passwordHash });

    await newUser.save();

    req.session.user = { id: newUser.id, username: newUser.username, role: newUser.role };

    return res.redirect('/');

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { login, password } = req.body;

  try {
    if (!login || !password) {
      return res.status(400).send('<script>alert("Login e senha são obrigatórios!"); window.location.href = "/login"; </script>');
    }

    const user = await User.findOne({
      $or: [{ username: login }, { email: login }]
    });

    if (!user) {
      return res.status(404).send('<script>alert("Email ou username não encontrado!"); window.location.href = "/login"; </script>');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(422).send('<script>alert("Senha inválida!"); window.location.href = "/login"; </script>');;
    }

    req.session.user = { id: user.id, username: user.username , role: user.role};
    return res.redirect('/');

  } catch (error) {
    console.error('Erro durante o login:', error);
    return res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente novamente mais tarde.' });
  }
};

const logout = async (req, res) => {
  req.session.destroy();
  return res.status(200).json({message: "Usuário deslogado"});
};

const createEmployee = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }]
    });

    if (user) {
      return res.status(400).send('<script>alert("Email ou username já existente!"); window.location.href = "/"; </script>');
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({ name, username, email, password: passwordHash , role: "EMPLOYEE"});

    const userSaved = await newUser.save();

    return res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  createUser,
  login,
  logout,
  createEmployee
};
