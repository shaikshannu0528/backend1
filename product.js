const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    image: String,
    description: String
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;