const path = require('path');
const fs = require('fs');
const { USERS } = require('../../constants/entities');
const usersPath = path.resolve(__dirname, '../../temp-db/', `${USERS}.json`);
const usersState = [];

const getUsersFromDB = () => {
  return new Promise((res, rej) => {
    // fs.readFile(usersPath, 'utf-8', (err, users) => {
    //   if (err) {
    //     rej(err);
    //   } else {
    //     res(users);
    //   }
    // });
    res(JSON.stringify(usersState));
  })
    .then((users) => JSON.parse(users))
    .catch(console.error);
};

const saveUserToDB = (user) => {
  getUsersFromDB()
    .then((users) => {
      users.push(user);
      return users;
    })
    .then((users) => {
      // return new Promise((res, rej) => {
      //   fs.writeFile(usersPath, JSON.stringify(users), (err) => {
      //     if (err) {
      //       rej(err);
      //     } else {
      //       res('User successfully added!');
      //     }
      //   });
      // });
      usersState.splice(0, usersState.length, ...users);
      return 'User successfully added!';
    })
    .then(console.log)
    .catch(console.error);
};

const updateUserToDB = (user) => {
  getUsersFromDB()
    .then((users) => {
      // return new Promise((res, rej) => {
      //   const userIndex = users.findIndex(({ id }) => id === user.id);
      //   users.splice(userIndex, 1, user);

      //   fs.writeFile(usersPath, JSON.stringify(users), (err) => {
      //     if (err) {
      //       rej(err);
      //     } else {
      //       res('User successfully updated!');
      //     }
      //   });
      // });
      const userIndex = users.findIndex(({ id }) => id === user.id);
      users.splice(userIndex, 1, user);
      usersState.splice(0, usersState.length, ...users);
      return 'User successfully updated!';
    })
    .then(console.log)
    .catch(console.error);
};

const removeUserFromDB = (userId) => {
  getUsersFromDB()
    .then((users) => {
      // return new Promise((res, rej) => {
      //   const userIndex = users.findIndex((user) => user.id === userId);
      //   users.splice(userIndex, 1);

      //   fs.writeFile(usersPath, JSON.stringify(users), (err) => {
      //     if (err) {
      //       rej(err);
      //     } else {
      //       res('User successfully deleted!');
      //     }
      //   });
      // });
      const userIndex = users.findIndex((user) => user.id === userId);
      users.splice(userIndex, 1);
      usersState.splice(0, usersState.length, ...users);
      return 'User successfully deleted!';
    })
    .then(console.log)
    .catch(console.error);
};

module.exports = {
  getUsersFromDB,
  saveUserToDB,
  updateUserToDB,
  removeUserFromDB,
};
