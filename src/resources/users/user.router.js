const { prepareToSendUsers, saveUser } = require('./user.service');
const { USERS } = require('../../constants/entities');

const usersRouter = (app) => {
  app.get(`/${USERS}/`, async (req, res) => {
    const preparedUsers = await prepareToSendUsers();

    res.set('content-type', 'application/json');
    return res.json(preparedUsers);
  });

  app.post(`/${USERS}/`, async (req, res) => {
    await saveUser(req.body);
    // .then(res.send('User created!'))
    // .catch(res.send('Something went wrong...'));
    res.set('content-type', 'application/json');
    res.json({ login: 'fawe', name: 'fawe' });
  });
};

module.exports = usersRouter;
