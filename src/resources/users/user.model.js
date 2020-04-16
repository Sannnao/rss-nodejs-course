const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  login: String,
  password: String,
});

userSchema.statics.toResponce = ({ _id, name, login }) => {
  return { id: _id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
