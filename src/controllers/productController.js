const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  const {id} = req.params
  try {
    const product = await Product.findOne({id:id});
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, description, link, image_url} = req.body;

  try {
    const productByName = await Product.findOne({ name: name });
    if (productByName) {
      return res.status(400).json({ message: 'Produto com esse nome já existe' });
    }

    const productByLink = await Product.findOne({ link: link });
    if (productByLink) {
      return res.status(400).json({ message: 'Produto com esse link já existe' });
    }

    const newProduct = new Product({ name, description, link, image_url });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {

  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
  const product = await Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name, 
    description: req.body.description,
    link: req.body.link,
    image_url: req.body.image_url
  })
  res.status(200).json({ message: 'Usuário deletado com sucesso' });
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