const {
  getAllResources,
  addResource,
  getResource,
  updateResource,
  deleteResource,
} = require('../router-constructor/service');
const User = require('./user.model');

const getAllUsers = async (pathToDb) => {
  const users = await getAllResources(pathToDb);
  const usersWithoutPass = users.map(User.excludePassword);

  return usersWithoutPass;
};

const addUser = async (userData, pathToDb) => {
  const newUser = await addResource(userData, User, pathToDb);

  return User.excludePassword(newUser);
};

const getUser = async (userId, pathToDb) => {
  const user = await getResource(userId, pathToDb);

  return User.excludePassword(user);
};

const updateUser = async (userId, userData, pathToDb) => {
  const updatedUser = await updateResource(userId, userData, pathToDb);

  return User.excludePassword(updatedUser);
};

const deleteUser = async (userId, pathToDb) => {
  await deleteResource(userId, pathToDb);
};

module.exports = {
  getAllUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
