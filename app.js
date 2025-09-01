// const path = require('path');
// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');
// const User = require('./models/user');

// const app = express();

// // ✅ Final MongoDB URI with real credentials
// const mongoURI = 'mongodb+srv://niranjan:patel@cluster0.mrhd61k.mongodb.net/investgrow?retryWrites=true&w=majority&appName=Cluster0';

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));


// // Routes
// app.get('/', (req, res) => res.render('home'));

// app.get('/signup', (req, res) => res.render('signup'));

// app.post('/signup', async (req, res) => {
//   const { username, password, Mobile_No } = req.body;

//   const indianMobileRegex = /^[6-9]\d{9}$/;
//   if (!indianMobileRegex.test(Mobile_No)) {
//     return res.render('success', { message: 'Invalid Indian mobile number.' });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.create({ username, password: hashedPassword, Mobile_No });
//     res.render('success', { message: 'Signup successful!' });
//   } catch (error) {
//     res.render('success', { message: 'Error creating user: ' + error.message });
//   }
// });

// app.get('/login', (req, res) => res.render('login'));

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });

//     if (user && await bcrypt.compare(password, user.password)) {
//       res.render('profile', { user });
//     } else {
//       res.render('success', { message: 'Invalid credentials.' });
//     }
//   } catch (error) {
//     res.render('success', { message: 'Login error: ' + error.message });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

// ✅ MongoDB URI
const mongoURI = 'mongodb+srv://niranjan:patel@cluster0.mrhd61k.mongodb.net/investgrow?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Middleware setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Main Routes

// Home page
app.get('/', (req, res) => res.render('home'));

// Signup form
app.get('/signup', (req, res) => res.render('signup'));

// Signup form submission
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

// Login form
app.get('/login', (req, res) => res.render('login'));

// Login form submission
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

// ✅ Serve static files from "Portfolio" folder at "/portfolio" path
app.use('/portfolio', express.static(path.join(__dirname, 'Portfolio')));

// ✅ Fallback route for /portfolio (for single-page apps)
app.get('/portfolio/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Portfolio', 'index.html'));
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
