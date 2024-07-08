const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middleware/authenticateAcess');

router.get('/users',middleware.allowed, userController.getUsers);
router.get('/user/:id', middleware.allowed, userController.getUser);
router.delete('/delete/:id', middleware.isEmployee, userController.deleteUser);


router.post('/emp', middleware.isAdmin, userController.createEmployee);
router.delete('/emp/delete/:id', middleware.isAdmin, userController.deleteEmployee);

router.post('/login', userController.login);
router.post('/logout',userController.logout);
router.post('/register', userController.createUser);

router.get('/check-login',middleware.allowed, (req, res) => {
    if(req.session.user){
        return res.status(200).json({user: req.session.user});
    }else{
        return res.status(200).json({user: null})
    }
})

module.exports = router;