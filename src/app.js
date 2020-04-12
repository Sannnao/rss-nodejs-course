const path = require('path');
const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/board.router');
const tasksRouter = require('./resources/tasks/task.router');

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use('/', (req, res, next) => {
  console.log('Request URL: ', `http://localhost:4000${req.url}`);
  if (Object.keys(req.query).length) {
    console.log('Request query: ', req.query);
  }
  if (Object.keys(req.body).length) {
    console.log('Request body: ', req.body);
  }

  next();
});

app.use('/users/', userRouter);
app.use('/boards/', boardsRouter);
app.use('/boards/', tasksRouter);

process.on('uncaughtException', (error, origin) => {
  console.log(`Caught exception: ${error}`);
  console.log(`Exception origin: ${origin}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('reason:', reason);
  console.log('Unhandled Rejection at:', promise);
});

// ******************
// *  Test exception
// ******************
// setTimeout(() => {
//   throw new Error('Oops!');
// }, 1500);

app.use((err, req, res, next) => {
  const isCustomError =
    Object.keys(err).includes('message') && Object.keys(err).includes('status');
  if (isCustomError) {
    console.log(err);
    const { status, message } = err;
    res.status(status).json({ message });
    console.error(message);
  } else {
    console.error('Internal server errror!');
    res.status(500).json({ message: 'Internal server errror!' });
    next(err);
  }
});

module.exports = app;
