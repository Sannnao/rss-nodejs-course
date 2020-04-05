const {
  getUsersFromDB,
  saveUserToDB,
  updateUserToDB,
  removeUserFromDB,
} = require('./user.memory.repository');
const { unassignUser } = require('../tasks/task.service');
const User = require('./user.model');

const getAllUsers = async () => {
  const users = await getUsersFromDB();
  const usersWithoutPass = await users.map(User.excludePassword);

  return usersWithoutPass;
};

const addUser = async (userData) => {
  const newUser = new User(userData);

  await saveUserToDB(newUser);
  return User.excludePassword(newUser);
};

const getUser = async (userId) => {
  const users = await getAllUsers();
  const receivedUser = await users.find((user) => user.id === userId);

  return receivedUser;
};

const updateUser = async (userId, userData) => {
  const user = await getUser(userId);

  if (user === undefined) {
    return undefined;
  }
  const updatedUser = Object.assign({}, user, userData);

  await updateUserToDB(updatedUser);
  return updatedUser;
};

const deleteUser = async (userId) => {
  const user = await getUser(userId);

  if (user === undefined) {
    return undefined;
  }

  await removeUserFromDB(userId);
  await unassignUser(userId);
  return user;
};

module.exports = {
  getAllUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
