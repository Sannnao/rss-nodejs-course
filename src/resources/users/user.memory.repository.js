const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const pathToUserDB = path.join(__dirname, '../../temp-db/', 'users.json');

const getUsersFromDB = async () => {
  try {
    const users = await readFile(pathToUserDB, 'utf-8');
    return JSON.parse(users);
  } catch (err) {
    console.error('Something went wrong when getting users!', err);
    throw {
      status: 401,
      message: 'Something went wrong when getting users!',
    };
  }
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
    } else {
      return user;
    }
  } catch ({ status, message }) {
    console.error(`Can't get a user because: ${message}`);
    throw {
      status,
      message: `Can't get a user because: ${message}`,
    };
  }
};

const saveUsersToDB = async (users) => {
  try {
    await writeFile(pathToUserDB, JSON.stringify(users));
    console.log('Users saved!');
  } catch (err) {
    console.error('Something went wrong when saving users!', err);
    throw {
      status: 401,
      message: 'Something went wrong when saving users!',
    };
  }
};

const saveUserToDB = async (user) => {
  try {
    const users = await getUsersFromDB();
    users.push(user);
    await saveUsersToDB(users);
  } catch (err) {
    console.error(`Can't save a user because: ${err.message}`);
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
    } else {
      const user = users[userIndex];
      const updatedUser = Object.assign({}, user, userData);
      users.splice(userIndex, 1, updatedUser);
      saveUsersToDB(users);
      return updatedUser;
    }
  } catch ({ status, message }) {
    console.error(`Can't update a user because: ${message}`);
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
    } else {
      users.splice(userIndex, 1);
      await saveUsersToDB(users);
      return users;
    }
  } catch ({ status, message }) {
    console.error(`Can't delete a user because: ${message}`);
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
