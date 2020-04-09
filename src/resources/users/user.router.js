const router = require('express').Router();
const {
  excludePasswords,
  excludePassword,
  createUser,
  updateUser,
  deleteUserActions,
} = require('./user.service');
const {
  getUsersFromDB,
  getUserFromDB,
  saveUserToDB,
  updateUserToDB,
  removeUserFromDB,
} = require('./user.memory.repository');

router.route('/').get((req, res) => {
  getUsersFromDB()
    .then((users) => {
      return excludePasswords(users);
    })
    .then((users) => {
      res
        .set('content-type', 'application/json')
        .status(200)
        .json(users);
    })
    .catch(({ message, status }) => {
      res
        .set('content-type', 'application/json')
        .status(status)
        .json({ message });
    });
});

router.route('/').post((req, res) => {
  const userData = req.body;
  if (!userData) {
    res
      .set('content-type', 'application/json')
      .status(400)
      .json({ message: 'Request should contains body!' });
  } else {
    const newUser = createUser(userData);

    saveUserToDB(newUser)
      .then(() => {
        res
          .set('content-type', 'application/json')
          .status(200)
          .json(newUser);
      })
      .catch(({ status, message }) => {
        res
          .set('content-type', 'application/json')
          .status(status)
          .json({ message });
      });
  }
});

router.route('/:userId/').get((req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    res
      .set('content-type', 'application/json')
      .status(400)
      .json({ message: 'Request should contains user id!' });
  } else {
    getUserFromDB(userId)
      .then((user) => {
        return excludePassword(user);
      })
      .then((user) => {
        res
          .set('content-type', 'application/json')
          .status(200)
          .json(user);
      })
      .catch(({ status, message }) => {
        res
          .set('content-type', 'application/json')
          .status(status)
          .json({ message });
      });
  }
});

router.route('/:id/').put((req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  if (!(userId && userData)) {
    res
      .set('content-type', 'application/json')
      .status(400)
      .json({ message: 'Request should contains body!' });
  } else {
    getUserFromDB(userId)
      .then((user) => {
        return updateUser(user, userData);
      })
      .then((updatedUser) => {
        updateUserToDB(updatedUser);

        res
          .set('content-type', 'application/json')
          .status(200)
          .json(updatedUser);
      })
      .catch(({ status, message }) => {
        res
          .set('content-type', 'application/json')
          .status(status)
          .json({ message });
      });
  }
});

router.route('/:id/').delete((req, res) => {
  const userId = req.params.id;
  if (!userId) {
    res
      .set('content-type', 'application/json')
      .status(400)
      .json({ message: 'Request should contains user id!' });
  } else {
    getUserFromDB(userId)
      .then(() => {
        deleteUserActions(userId);
        removeUserFromDB(userId);

        res.sendStatus(204);
      })
      .catch(({ status, message }) => {
        res
          .set('content-type', 'application/json')
          .status(status)
          .json({ message });
      });
  }
});

module.exports = router;
