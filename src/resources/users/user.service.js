const { unassignUser } = require('../tasks/task.service');
const User = require('./user.model');

const excludePasswords = async (users) => {
  return users.map(User.excludePassword);
};

const excludePassword = (user) => User.excludePassword(user);

const createUser = (userData) => {
  const newUser = new User(userData);

  return User.excludePassword(newUser);
};

const updateUser = (user, userData) => {
  return Object.assign({}, user, userData);
};

const deleteUserActions = async (userId) => {
  await unassignUser(userId);
};

module.exports = {
  excludePasswords,
  excludePassword,
  createUser,
  // getUser,
  updateUser,
  deleteUserActions,
};
