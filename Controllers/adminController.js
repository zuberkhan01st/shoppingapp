const User = require('../models/user');
const Store = require('../Models/product');

const bcrypt = require('bcrypt');
const Upload = require("../helpers/upload");


// Admin login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(400).send('Invalid email or password');
    }
    res.render('adminDashboard');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get users controller
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ name: { $ne: 'admin' } }).select('-password');
    res.render('userList', { users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

/*
// Add product controller (without image upload logic)
exports.addProduct = async (req, res) => {
  const { name, price, description, category, stock } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock
    });
    await newProduct.save();
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).send('Error adding product: ' + error.message);
  }
};
*/

exports.uploadFile = async (req, res) => {
  try {
      // Check if file exists
      if (!req.file) {
          return res.status(400).send({ success: false, msg: 'No file uploaded!' });
      }

      // Upload the file to Cloudinary
      const uploadResult = await Upload.uploadFile(req.file.path);

      // Create a new store record with the Cloudinary URL
      const store = new Store({
          product_name: req.body.productName,  // Store product name from form
          description: req.body.description,  // Store description from form
          price: req.body.price,  // Store price from form
          file_url: uploadResult.secure_url    // Store Cloudinary URL
      });

      // Save to MongoDB
      const record = await store.save();

      // Send a success response
      res.send({ success: true, msg: 'File Uploaded Successfully!', data: record });

  } catch (error) {
      res.status(500).send({ success: false, msg: error.message });
  }
};

exports.showProducts = async (req, res) => {
  try {
      // Fetch all products from the database
      const products = await Store.find();  // You can add query filters if needed

      // Send the products as a response
      res.render('showProducts', { products: products });
  } catch (error) {
      res.status(500).send({ success: false, msg: error.message });
  }
};
exports.show_products = async (req, res) => {
  try {
      // Fetch all products from the database
      const products = await Store.find();  // You can add query filters if needed

      // Send the products as a response
      res.render('productList', { products: products });
  } catch (error) {
      res.status(500).send({ success: false, msg: error.message });
  }
};



// Delete product controller
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
  } catch (error) {
    res.status(500).send('Error deleting product');
  }
};

// Render Add Product page
exports.renderAddProductPage = (req, res) => {
  res.render('addProduct');
};
