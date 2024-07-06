const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../config/multer')
const authenticateAcess = require('../middleware/authenticateAcess');

router.get('/api', productController.getProducts);
router.get('/api/:id', productController.getProduct);
router.post('/register-product', upload.single("file"), productController.createProduct);
router.put('/update-product/:id', productController.updateProduct);
router.delete('/delete-product/:id', productController.deleteProduct);

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/:id', (req, res) => {
    res.redirect('/login')
})

module.exports = router;