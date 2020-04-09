const router = require('express').Router();
const {
  getUsersToResponse,
  getUser,
  saveUser,
  updateUser,
  deleteUser,
} = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const users = await getUsersToResponse();

    res.status(200).json(users);
  } catch ({ message, status }) {
    res.status(status).json({ message });
  }
});

router.route('/').post(async (req, res) => {
  const userData = req.body;
  if (!Object.keys(userData).length) {
    return res.status(400).json({ message: 'Request should contains body!' });
  }

  try {
    const savedUser = await saveUser(userData);

    res.status(200).json(savedUser);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

router.route('/:userId/').get(async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res
      .status(400)
      .json({ message: 'Request should contains user id!' });
  }

  try {
    const user = await getUser(userId);

    res.status(200).json(user);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

router.route('/:id/').put(async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  if (!(userId && Object.keys(userData).length)) {
    return res.status(400).json({ message: 'Request should contains body!' });
  }

  try {
    const updatedUser = await updateUser(userId, userData);

    res.status(200).json(updatedUser);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

router.route('/:id/').delete(async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res
      .status(400)
      .json({ message: 'Request should contains user id!' });
  }

  try {
    await deleteUser(userId);

    res.sendStatus(204);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
});

module.exports = router;
