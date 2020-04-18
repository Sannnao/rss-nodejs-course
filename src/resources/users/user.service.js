const { unassignUser } = require('../tasks/task.service');
const {
  getUsersFromDB,
  getUserFromDB,
  saveUserToDB,
  updateUserToDB,
  removeUserFromDB,
} = require('./user.memory.repository');

const getUsersToResponse = () => getUsersFromDB();

const getUser = (userId) => getUserFromDB(userId);

const saveUser = (userData) => saveUserToDB(userData);

const updateUser = (userId, userData) => updateUserToDB(userId, userData);

const deleteUser = async (userId) => {
  await unassignUser(userId);
  await removeUserFromDB(userId);
};

module.exports = {
  getUsersToResponse,
  saveUser,
  getUser,
  updateUser,
  deleteUser,
};
