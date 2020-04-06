const router = require('express').Router();
const {
  getAllUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require('./user.service');
const path = require('path');
const { USERS, BOARDS } = require('../../constants/entities');
const boardsPath = path.resolve(__dirname, '../../temp-db/', `${BOARDS}.json`);

router.route('/').get((req, res) => {
  const users = getAllUsers();

  res
    .set('content-type', 'application/json')
    .status(200)
    .json(users);
});

router.route('/').post((req, res) => {
  if (!req.body) {
    res
      .set('content-type', 'application/json')
      .status(400)
      .json({ message: 'Request should contains body!' });
  } else {
    console.log(req.body);
    const newUser = addUser(req.body);

    res
      .set('content-type', 'application/json')
      .status(200)
      .json(newUser);
  }
});

router.route('/:userId/').get((req, res) => {
  const userId = req.params.userId;
  const user = getUser(userId);

  if (user === undefined) {
    res
      .set('content-type', 'application/json')
      .status(404)
      .json({ message: `User with id ${userId} doesn't exist!` });
  } else {
    res
      .set('content-type', 'application/json')
      .status(200)
      .json(user);
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
    const updatedUser = updateUser(userId, userData);

    res
      .set('content-type', 'application/json')
      .status(200)
      .json(updatedUser);
  }
});

router.route('/:id/').delete((req, res) => {
  const userId = req.params.id;
  const user = deleteUser(userId, boardsPath);

  console.log('USER =====.>>>>>', user);

  if (user === undefined) {
    res.status(404).json({ message: `User with id ${userId} doesn't exist!` });
  } else {
    res.sendStatus(204);
  }
});

module.exports = router;
