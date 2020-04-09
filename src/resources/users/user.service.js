const { unassignUser } = require('../tasks/task.service');
const User = require('./user.model');
const {
  getUsersFromDB,
  getUserFromDB,
  saveUserToDB,
  updateUserToDB,
  removeUserFromDB,
} = require('./user.memory.repository');

const getUsersToResponse = async () => {
  const users = await getUsersFromDB();
  return users.map(User.excludePassword);
};

const getUser = async (userId) => {
  const user = await getUserFromDB(userId);
  return User.excludePassword(user);
};

const saveUser = async (userData) => {
  const newUser = new User(userData);
  const savedUser = await saveUserToDB(newUser);

  return User.excludePassword(savedUser);
};

const updateUser = (userId, userData) => {
  return updateUserToDB(userId, userData);
};

const deleteUser = async (userId) => {
  await removeUserFromDB(userId);
  await unassignUser(userId);
};

module.exports = {
  getUsersToResponse,
  saveUser,
  getUser,
  updateUser,
  deleteUser,
};
