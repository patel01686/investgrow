const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./models/user');
require('./db');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Home page
app.get('/', (req, res) => res.render('home'));

// Signup page
app.get('/signup', (req, res) => res.render('signup'));

// Signup POST
app.post('/signup', async (req, res) => {
  const { username, password, Mobile_No } = req.body;

  const indianMobileRegex = /^[6-9]\d{9}$/;
  if (!indianMobileRegex.test(Mobile_No)) {
    return res.render('success', { message: 'Invalid Indian mobile number.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, Mobile_No });
    res.render('success', { message: 'Signup successful!' });
  } catch (error) {
    res.render('success', { message: 'Error creating user: ' + error.message });
  }
});

// Login page
app.get('/login', (req, res) => res.render('login'));

// Login POST
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      res.render('profile', { user });
    } else {
      res.render('success', { message: 'Invalid credentials.' });
    }
  } catch (error) {
    res.render('success', { message: 'Login error: ' + error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
