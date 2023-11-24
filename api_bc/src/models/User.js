const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  author_name: String,
  author_email: String,
  author_user: String,
  author_pwd: String,
  author_level: String,
  author_status: { type: Boolean, default: true },
  author_create_date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
