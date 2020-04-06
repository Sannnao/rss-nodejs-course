const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const pathToUserDB = path.join(__dirname, '../../temp-db/', 'users.json');

const getUsersFromDB = () => {
  return readFile(pathToUserDB, 'utf-8')
    .then((jsonUsers) => JSON.parse(jsonUsers))
    .catch((err) => {
      console.error('Something went wrong when getting users!', err);
      return {
        status: 401,
        message: 'Something went wrong when getting users!',
      };
    });
};

const getUserFromDB = (userId) => {
  return getUsersFromDB().then((users) => {
    return new Promise((resolve, reject) => {
      const user = users.find(({ id }) => id === userId);

      if (user === undefined) {
        reject({
          status: 404,
          message: `User with id ${userId} doesn't exist!`,
        });
      } else {
        resolve(user);
      }
    });
  });
};

const saveUsersToDB = (users) => {
  return writeFile(pathToUserDB, JSON.stringify(users))
    .then(() => console.log('Users saved!'))
    .catch((err) => {
      console.error('Something went wrong when saving users!', err);
      return {
        status: 401,
        message: 'Something went wrong when saving users!',
      };
    });
};

const saveUserToDB = (user) => {
  return getUsersFromDB()
    .then((users) => {
      users.push(user);
      return users;
    })
    .then((users) => {
      return saveUsersToDB(users);
    });
};

const updateUserToDB = (user) => {
  return getUsersFromDB()
    .then((users) => {
      const userIndex = users.findIndex(({ id }) => id === user.id);
      users.splice(userIndex, 1, user);
      return users;
    })
    .then((users) => {
      return saveUsersToDB(users);
    });
};

const removeUserFromDB = (userId) => {
  return getUsersFromDB()
    .then((users) => {
      const userIndex = users.findIndex((user) => user.id === userId);
      users.splice(userIndex, 1);
      return users;
    })
    .then((users) => {
      return saveUsersToDB(users);
    });
};

module.exports = {
  getUsersFromDB,
  getUserFromDB,
  saveUserToDB,
  updateUserToDB,
  removeUserFromDB,
};
