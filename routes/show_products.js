// File: routes/shop_routes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Correct controller path

// Route to display products
router.get('/products', adminController.show_products);

module.exports = router;
