const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const productSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    image: String,
    description: String
});
const Product = mongoose.model('Product', productSchema);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('/', async (req, res) => {
    const products = await Product.find({});
    res.render('home', { products });
});

app.get('/form', (req, res) => {
    res.render('form');
});

app.post('/products', async (req, res) => {
    const { title, author, price, image, description } = req.body;
    const product = new Product({ title, author, price, image, description });
    await product.save();
    res.redirect('/');
});

// Route to render the edit form for a specific product
app.get('/products/edit/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('edit', { product });
});

// Route to handle updating a product
app.post('/products/update/:id', async (req, res) => {
    const { title, author, price, image, description } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { title, author, price, image, description });
    res.redirect('/');
});

app.listen(3009, () => {
    console.log('Server running on port 3009');
});