const express = require('express');
const path = require('path')
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../giftos-html', 'login.html')));
router.post('/login', userController.login);
router.get('/register', (req, res) => res.sendFile(path.join(__dirname, '../giftos-html', 'register.html')));
router.post('/register', userController.register);
 // Correct controller path

// Route to display products



module.exports = router;
