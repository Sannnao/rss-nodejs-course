const router = require('express').Router();
const {
  getAllUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await getAllUsers();

  res
    .set('content-type', 'application/json')
    .status(200)
    .json(users);
});

router.route('/').post(async (req, res) => {
  if (!req.body) {
    res
      .set('content-type', 'application/json')
      .status(400)
      .json({ message: 'Request should contains body!' });
  } else {
    const newUser = await addUser(req.body);

    res
      .set('content-type', 'application/json')
      .status(200)
      .json(newUser);
  }
});

router.route('/:userId/').get(async (req, res) => {
  const userId = req.params.userId;
  const user = await getUser(userId);

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

router.route('/:id/').put(async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  if (!(userId && userData)) {
    res
      .set('content-type', 'application/json')
      .status(400)
      .json({ message: 'Request should contains body!' });
  } else {
    const updatedUser = await updateUser(userId, userData);

    if (updatedUser === undefined) {
      res
        .set('content-type', 'application/json')
        .status(404)
        .json({ message: 'User not found!' });
    } else {
      res
        .set('content-type', 'application/json')
        .status(200)
        .json(updatedUser);
    }
  }
});

router.route('/:id/').delete(async (req, res) => {
  const userId = req.params.id;
  const user = await deleteUser(userId);

  if (user === undefined) {
    res.status(404).json({ message: `User with id ${userId} doesn't exist!` });
  } else {
    res.sendStatus(204);
  }
});

module.exports = router;
