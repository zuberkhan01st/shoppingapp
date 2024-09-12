const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../Controllers/adminController');
const bodyParser = require('body-parser');
const multer = require('multer');

// Admin login routes
router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../giftos-html', 'admin_login.html')));
router.post('/login', adminController.login);

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, 'public')));
const uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 }  // 500 KB limit
});

router.get('/upload-product', (req, res) => {
    res.render('addProduct');  // Ensure 'views' folder is configured properly
});
router.post('/upload-product', uploader.single("file"), adminController.uploadFile);

/*
// Add product routes (no file upload logic)
router.get('/product/add', (req, res) => res.sendFile(path.join(__dirname, '../public/addProduct.ejshtml')));
router.post('/product/add', adminController.addProduct);
*/

/*
// View products route
router.get('/products', adminController.viewProducts);
*/


router.get('/productss', adminController.showProducts); // Update the route to '/shop


// Delete product route
router.post('/products/delete/:id', adminController.deleteProduct);

// View users route
router.get('/users', adminController.getUsers);

module.exports = router;
