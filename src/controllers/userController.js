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

const createUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const userByEmail = await User.findOne({ email: email });
    if (userByEmail) {
      return res.status(400).json({ message: 'Usuário com este email já existe' });
    }

    const userByUsername = await User.findOne({ username: username });
    if (userByUsername) {
      return res.status(400).json({ message: 'Usuário com este nome de usuário já existe' });
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

module.exports = {
  getUsers,
  createUser,
};