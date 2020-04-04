const usersRepo = require('./user.memory.repository');
const { createUser, excludePassword } = require('./utils/user-utils');

const getAllUsers = () => {
  return new Promise((res, rej) => {
    usersRepo
      .getAllUsers()
      .then((users) => res(JSON.parse(users)))
      .catch((err) => rej(err));
  });
};

const getUser = async (userId) => {
  const users = await getAllUsers();
  const user = users.find(({ id }) => id === userId);

  return excludePassword(user);
};

const updateUser = async (userId, newUserParams) => {
  const users = await getAllUsers();
  const userIndex = users.findIndex(({ id }) => id === userId);
  const updatedUser = { id: userId, ...newUserParams };
  users[userIndex] = updatedUser;
  usersRepo.saveAllUsers(JSON.stringify(users));

  return excludePassword(updatedUser);
};

const deleteUser = async (userId) => {
  const users = await getAllUsers();
  const updatedUsers = users.filter(({ id }) => id !== userId);

  usersRepo.saveAllUsers(JSON.stringify(updatedUsers));
};

const prepareToSendUsers = async () => {
  const users = await getAllUsers();
  const usersWithoutPass = users.map(excludePassword);

  return usersWithoutPass;
};

const saveUser = async (userData) => {
  const newUser = createUser(userData);
  const users = await getAllUsers();
  users.push(newUser);
  usersRepo.saveAllUsers(JSON.stringify(users));

  return excludePassword(newUser);
};

module.exports = {
  getAllUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser,
  prepareToSendUsers,
};
