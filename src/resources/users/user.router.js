const {
  getUser,
  prepareToSendUsers,
  saveUser,
  updateUser,
  deleteUser,
} = require('./user.service');
const { USERS } = require('../../constants/entities');

const usersRouter = (app) => {
  app.get(`/${USERS}/`, async (req, res) => {
    const preparedUsers = await prepareToSendUsers();

    res.set('content-type', 'application/json');
    return res.json(preparedUsers);
  });

  app.post(`/${USERS}/`, async (req, res) => {
    const savedUser = await saveUser(req.body);

    res.set('content-type', 'application/json');
    return res.json(savedUser);
  });

  app.get(`/${USERS}/:id`, async (req, res) => {
    const userId = req.params.id;
    const user = await getUser(userId);

    res.set('content-type', 'application/json');
    return res.json(user);
  });

  app.put(`/${USERS}/:id`, async (req, res) => {
    const userId = req.params.id;
    const newUserParams = req.body;

    res.set('content-type', 'application/json');
    const updatedUser = updateUser(userId, newUserParams);
    return res.json(updatedUser);
  });

  app.delete(`/${USERS}/:id`, async (req, res) => {
    const userId = req.params.id;

    deleteUser(userId);
    return res.sendStatus(204);
  });
};

module.exports = usersRouter;
