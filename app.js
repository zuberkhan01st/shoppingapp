const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const pageRoutes = require('./routes/pageRoutes'); // Import page routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Assuming you have admin routes
const showProducts= require('./routes/show_products');
const app = express();
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'giftos-html' directory
app.use(express.static(path.join(__dirname, 'giftos-html')));

app.set('views', path.join(__dirname, 'views'));

// Set EJS as the view engine
app.set('view engine', 'ejs');


// Use routes
app.use('/', pageRoutes); // Handle routes for pages
app.use('/users', userRoutes); // Handle user-related routes
app.use('/admin', adminRoutes); // Handle admin-related routes
app.use('/shop',showProducts);
// Connect to MongoDB



mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
