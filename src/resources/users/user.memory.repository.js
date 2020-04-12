// const fs = require('fs');
// const path = require('path');
// const util = require('util');

// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);
// const pathToUserDB = path.join(__dirname, '../../temp-db/', 'users.json');

const usersState = [];

const getUsersFromDB = async () => {
  // const users = await readFile(pathToUserDB, 'utf-8');
  // return JSON.parse(users);
  return [...usersState];
};

const getUserFromDB = async (userId) => {
  try {
    const users = await getUsersFromDB();
    const user = users.find(({ id }) => id === userId);

    if (user === undefined) {
      throw {
        status: 404,
        message: `User with id ${userId} doesn't exist!`,
      };
    }

    return user;
  } catch ({ status, message }) {
    throw {
      status,
      message: `Can't get a user because: ${message}`,
    };
  }
};

const saveUsersToDB = async (users) => {
  // await writeFile(pathToUserDB, JSON.stringify(users));
  // console.log('Users saved!');
  usersState.splice(0, usersState.length, ...users);
};

const saveUserToDB = async (user) => {
  try {
    const users = await getUsersFromDB();
    users.push(user);
    await saveUsersToDB(users);
  } catch (err) {
    throw {
      status,
      message: `Can't save a user because: ${err.message}`,
    };
  }
};

const updateUserToDB = async (userId, userData) => {
  try {
    const users = await getUsersFromDB();
    const userIndex = users.findIndex(({ id }) => id === userId);

    if (userIndex === -1) {
      throw {
        status: 404,
        message: `User with id ${userId} doesn't exist!`,
      };
    }

    const user = users[userIndex];
    const updatedUser = Object.assign({}, user, userData);

    users.splice(userIndex, 1, updatedUser);
    saveUsersToDB(users);

    return updatedUser;
  } catch ({ status, message }) {
    throw {
      status,
      message: `Can't update a user because: ${message}`,
    };
  }
};

const removeUserFromDB = async (userId) => {
  try {
    const users = await getUsersFromDB();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw {
        status: 404,
        message: `User with id ${userId} doesn't exist!`,
      };
    }

    users.splice(userIndex, 1);
    await saveUsersToDB(users);
    return users;
  } catch ({ status, message }) {
    throw {
      status,
      message: `Can't delete a user because: ${message}`,
    };
  }
};

module.exports = {
  getUsersFromDB,
  getUserFromDB,
  saveUserToDB,
  updateUserToDB,
  removeUserFromDB,
};
