const { unassignUser } = require('../tasks/task.service');
const {
  getUsersFromDB,
  getUserFromDB,
  saveUserToDB,
  updateUserToDB,
  removeUserFromDB,
} = require('./user.memory.repository');

const getUsersToResponse = async () => {
  return getUsersFromDB();
};

const getUser = async (userId) => {
  return getUserFromDB(userId);
};

const saveUser = async (userData) => {
  return saveUserToDB(userData);
};

const updateUser = async (userId, userData) => {
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
