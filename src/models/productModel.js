const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  description: { type: String, required: true},
  link: { type: String, required: true, unique: true},
  image_url: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;