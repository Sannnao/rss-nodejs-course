const usersState = [];

const getUsersFromDB = () => {
  return [...usersState];
};

const saveUserToDB = (user) => {
  usersState.push(user);
  return 'User successfully added!';
};

const updateUserToDB = (user) => {
  const userIndex = usersState.findIndex(({ id }) => id === user.id);
  usersState.splice(userIndex, 1, user);
  return 'User successfully updated!';
};

const removeUserFromDB = (userId) => {
  const userIndex = usersState.findIndex((user) => user.id === userId);
  usersState.splice(userIndex, 1);
  return 'User successfully deleted!';
};

module.exports = {
  getUsersFromDB,
  saveUserToDB,
  updateUserToDB,
  removeUserFromDB,
};
