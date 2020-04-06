const {
  getUsersFromDB,
  saveUserToDB,
  updateUserToDB,
  removeUserFromDB,
} = require('./user.memory.repository');
const { unassignUser } = require('../tasks/task.service');
const User = require('./user.model');

const getAllUsers = () => {
  const users = getUsersFromDB();
  const usersWithoutPass = users.map(User.excludePassword);

  return usersWithoutPass;
};

const addUser = (userData) => {
  const newUser = new User(userData);

  saveUserToDB(newUser);
  return User.excludePassword(newUser);
};

const getUser = (userId) => {
  const users = getAllUsers();
  const receivedUser = users.find((user) => user.id === userId);

  return receivedUser;
};

const updateUser = (userId, userData) => {
  const user = getUser(userId);

  if (user === undefined) {
    return undefined;
  }
  const updatedUser = Object.assign({}, user, userData);

  updateUserToDB(updatedUser);
  return updatedUser;
};

const deleteUser = (userId) => {
  const user = getUser(userId);

  if (user === undefined) {
    return undefined;
  }

  removeUserFromDB(userId);
  unassignUser(userId);
  return user;
};

module.exports = {
  getAllUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
