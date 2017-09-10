const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String //to be added to when authentication is tackled
});

module.exports = mongoose.model('User', userSchema);
