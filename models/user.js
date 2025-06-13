const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: { // lowercase 'password' to match app.js
    type: String,
    required: true
  },
  Mobile_No: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
