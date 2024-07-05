const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/users',authenticateToken.authenticateToken, userController.getUsers);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/register', userController.createUser);
router.post('/refresh-token', authenticateToken.refreshToken);

module.exports = router;