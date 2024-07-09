const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  const {id} = req.params
  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, description, link } = req.body;
  const file = req.file;
  try {
    const productByName = await Product.findOne({ name });
    if (productByName) {
      return res.status(400).send('<script>alert("Produto com esse nome já existe!"); window.location.href = "/"; </script>');
    }

    const productByLink = await Product.findOne({ link });
    if (productByLink) {
      return res.status(400).send('<script>alert("Produto com esse link já existe!"); window.location.href = "/"; </script>');
    }

    const newProduct = new Product({ name, description, link, image_url: file.path });
    await newProduct.save();
    return res.redirect('/')
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.body.id;

    const productDeleted = await Product.findByIdAndDelete(productId);

    if (!productDeleted) {
      return res.status(403).send('<script>alert("Produto não encontrado!"); window.location.href = "/"; </script>');
    }

    return res.status(302).redirect('/');
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).send('Erro ao deletar produto: ' + error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
  Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name, 
    description: req.body.description,
    link: req.body.link,
    image_url: req.body.image_url
  })
  res.status(200).redirect('/');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct
};