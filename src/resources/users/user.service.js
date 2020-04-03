const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAllUsers = () => {
  return new Promise((res, rej) => {
    usersRepo
      .getAllUsers()
      .then((users) => res(JSON.parse(users)))
      .catch((err) => rej(err));
  });
};

const prepareToSendUsers = async () => {
  const users = await getAllUsers();
  const usersWithoutPass = users.map(User.toResponse);

  return usersWithoutPass;
};

const saveUser = async (newUserData) => {
  const newUser = createUser(newUserData);
  const users = await getAllUsers();
  users.push(newUser);
  usersRepo.saveAllUsers(JSON.stringify(users));
};

const createUser = (user) => {
  const newUser = new User(user);

  return newUser;
};

module.exports = { getAllUsers, createUser, saveUser, prepareToSendUsers };
