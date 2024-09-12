const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const newUser = new User({ name, email, password, phone, address });
    await newUser.save();
    res.redirect('/users/login');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send('Invalid email or password');
    }

    // Generate a token (optional)
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Redirect or send a response
    res.cookie('token', token, { httpOnly: true }); // Store token in cookies (optional)
    res.redirect('/'); // Redirect to a profile or home page
  } catch (err) {
    res.status(500).send(err.message);
  }
};
