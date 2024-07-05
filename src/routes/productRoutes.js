const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../config/multer')

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/register-product', upload.single("file"), productController.createProduct);
router.put('/update-product/:id', productController.updateProduct);
router.delete('/delete-product/:id', productController.deleteProduct);

module.exports = router;