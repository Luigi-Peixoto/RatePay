const User = require('../models/userModel');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
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
      return res.status(400).json({ message: 'Email ou username já existente!' });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({ name, username, email, password: passwordHash });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { login, password } = req.body;

  try {
    if (!login || !password) {
      return res.status(400).json({ message: 'Login e senha são obrigatórios!' });
    }

    const user = await User.findOne({
      $or: [{ username: login }, { email: login }]
    });

    if (!user) {
      return res.status(404).json({ message: 'Email ou username não encontrado!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(422).json({ message: 'Senha inválida!' });
    }

    const payload = { 
      id: user._id, 
      username: user.username, 
      role: user.role 
    };

    const accessToken = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000
    });

    return res.redirect('/');

  } catch (error) {
    console.error('Erro durante o login:', error);
    return res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente novamente mais tarde.' });
  }
};

const logout = async (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });
  req.session.destroy();
  return res.redirect("/");
};



module.exports = {
  getUsers,
  login,
  logout,
  createUser
};
