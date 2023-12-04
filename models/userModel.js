const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: String,
  username: String,
  password: String,
  description: String,
  avatar: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
