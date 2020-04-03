const path = require('path');
const fs = require('fs');
const { USERS } = require('../../constants/entities');
const usersPath = path.resolve(__dirname, '../../temp-db/', `${USERS}.json`);

const getAllUsers = () => {
  return new Promise((res, rej) => {
    fs.readFile(usersPath, 'utf-8', (err, users) => {
      if (err) {
        rej('Something went wrong with getting users!');
      }

      res(users);
    });
  });
};

const saveAllUsers = (users) => {
  fs.writeFile(usersPath, users, (err) => {
    if (err) {
      return console.error('Something went wrong when saving users...', err);
    }

    console.log('Users uccessfully saved!');
  });
};

module.exports = { getAllUsers, saveAllUsers };
