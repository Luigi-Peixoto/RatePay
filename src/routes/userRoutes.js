const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/register', userController.createUser);

module.exports = router;