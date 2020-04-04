const path = require('path');

const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/board.router');

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

userRouter(app);
boardsRouter(app);

module.exports = app;
