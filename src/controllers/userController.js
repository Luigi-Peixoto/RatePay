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
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    if(user.role === "ADMIN" || user.role === "EMPLOYEE"){
      await User.deleteMany(user);
      return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    }

    return res.status(200).json({ message: 'Você não tem permissão para deletar esse usuário' });

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

    const userSaved = await newUser.save();

    req.session.user = { id: userSaved.id, username: userSaved.username , role: userSaved.role};
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
      return res.status(400).json({ message: 'Email ou username já existente!' });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({ name, username, email, password: passwordHash , role: "EMPLOYEE"});

    const userSaved = await newUser.save();

    req.session.user = { id: userSaved.id, username: userSaved.username , role: userSaved.role};
    return res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const user = await User.findByIdandRemove(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    await User.deleteMany(user);
    return res.status(200).json({ message: 'Usuário deletado com sucesso' });
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
  createEmployee,
  deleteEmployee
};
