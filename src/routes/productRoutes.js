const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../config/multer')
const middleware = require('../middleware/authenticateAcess');

router.get('/api',middleware.allowed,productController.getProducts);
router.get('/api/:id',middleware.allowed, productController.getProduct);

router.post('/register-product', upload.single("file"), productController.createProduct);
router.put('/update-product/:id', middleware.isEmployee,productController.updateProduct);
router.post('/delete-product',middleware.isEmployee, productController.deleteProduct);

router.get('/',middleware.allowed,productController.getProducts);

/*router.get('/:id',middleware.isAuthenticated, (req, res) => {
    const id = req.params.id;
    res.render('product', {id: id});
})*/

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.render('product', {id: id});
})

module.exports = router;