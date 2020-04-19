const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  login: String,
  password: String,
});

userSchema.statics.toResponce = ({ _id: id, name, login }) => ({
  id,
  name,
  login,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
