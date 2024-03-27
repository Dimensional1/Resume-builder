const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { resourceUsage } = require('process');
const app = express();
const Profile = require("./models/Resume")

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/resumeBuilder');

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Middleware for handling POST requests
app.use(express.urlencoded({ extended: true }));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
}).single('profileImage');

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
  });
  
  app.post('/create', upload, (req, res) => {
    const newProfile = new Profile({
      ...req.body,
      profileImage: req.file ? '/uploads/' + req.file.filename : null,
    });
    newProfile.save();
    res.redirect('/resume');
  });
  
  app.get('/resume', (req, res) => {
    Profile.findOne({}).sort({ _id: -1 }) 
      .then(profile => {
        if (profile) {
          res.render('resume', { profile: profile });
        } else {
          res.status(404).send('No profile found');
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error occurred');
      });
  });
  
  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });