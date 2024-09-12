const express = require('express');
const path = require('path');
const router = express.Router();
const nodemailer = require('nodemailer');

// Serve the home page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../giftos-html/index.html'));
  });

// Render the contact page
router.get('/contact', (req, res) => {
  res.render('contact_f');
});

// Handle form submission
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'flaskabcd1@gmail.com',
      pass: 'cdcc zoby vrvc vtod'
    }
  });

  const mailOptions = {
    from: email,
    to: 'ji.7768977983@gmail.com', // Your email address
    subject: `Contact Form(Sakhi Ladies Collection) Submission from ${name}`,
    text: `Message from: ${name} (${email})\n\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Message sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send message. Please try again later.');
  }
});



// Add other routes as needed
router.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname, '../giftos-html/shop.html'));
});

router.get('/why',(req,res)=>{
    res.sendFile(path.join(__dirname,'../giftos-html/why.html'));
});

router.get('/testimonial',(req,res)=>{
    res.sendFile(path.join(__dirname,"../giftos-html/testimonial.html"));
});

module.exports = router;
