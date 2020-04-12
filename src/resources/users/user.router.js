const router = require('express').Router();
const {
  getUsersToResponse,
  getUser,
  saveUser,
  updateUser,
  deleteUser,
} = require('./user.service');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await getUsersToResponse();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  const userData = req.body;
  if (!Object.keys(userData).length) {
    return next({ status: 400, message: 'Request should contains body!' });
  }

  try {
    const savedUser = await saveUser(userData);

    res.status(200).json(savedUser);
  } catch (err) {
    next(err);
  }
});

router.route('/:userId/').get(async (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) {
    return next({ status: 400, message: 'Request should contains user id!' });
  }

  try {
    const user = await getUser(userId);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.route('/:id/').put(async (req, res, next) => {
  const userId = req.params.id;
  const userData = req.body;
  if (!(userId && Object.keys(userData).length)) {
    return next({
      status: 400,
      message: 'Request should contains body and user id!',
    });
  }

  try {
    const updatedUser = await updateUser(userId, userData);

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.route('/:id/').delete(async (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return next({ status: 400, message: 'Request should contains user id!' });
  }

  try {
    await deleteUser(userId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
