const {
  getAllUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require('./user.service');
const path = require('path');
const { USERS, BOARDS } = require('../../constants/entities');
const usersPath = path.resolve(__dirname, '../../temp-db/', `${USERS}.json`);
const boardsPath = path.resolve(__dirname, '../../temp-db/', `${BOARDS}.json`);

const usersRouter = (app) => {
  app.get(`/${USERS}/`, async (req, res) => {
    const users = await getAllUsers(usersPath);

    res.set('content-type', 'application/json');
    return res.json(users);
  });

  app.post(`/${USERS}/`, async (req, res) => {
    const newUser = await addUser(req.body, usersPath);

    res.set('content-type', 'application/json');
    return res.json(newUser);
  });

  app.get(`/${USERS}/:userId/`, async (req, res) => {
    const userId = req.params.userId;
    const user = await getUser(userId, usersPath);

    res.set('content-type', 'application/json');
    return res.json(user);
  });

  app.put(`/${USERS}/:id`, async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    const updatedUser = await updateUser(userId, userData, usersPath);

    res.set('content-type', 'application/json');
    return res.json(updatedUser);
  });

  app.delete(`/${USERS}/:id`, async (req, res) => {
    const userId = req.params.id;

    await deleteUser(userId, usersPath, boardsPath);
    return res.sendStatus(204);
  });
};

module.exports = usersRouter;
