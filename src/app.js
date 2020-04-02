const path = require('path');
const fs = require('fs');
const stream = require('stream');

const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
// const userRouter = require('./resources/users/user.router');
const { USERS } = require('./constants/entities');
const User = require('./resources/users/user.model.js');

const filePath = path.resolve(__dirname, './temp-db/', `${USERS}.json`);

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

// app.post(`/${USERS}/`, (req, res) => {
//   fs.createWriteStream(filePath, req.params);
// });

app.get(`/${USERS}/`, (req, res) => {
  // console.log(req.params.id);
  const readStream = fs.createReadStream(filePath);
  class ExcludePasswordTransformer extends stream.Transform {
    _transform(data, encoding, callback) {
      const withoutPassword = JSON.parse(data).map(({ id, name, login }) => ({
        id,
        name,
        login,
      }));
      this.push(JSON.stringify(withoutPassword));
      callback();
    }
  }
  res.set('Content-Type', 'application/json');
  readStream.pipe(new ExcludePasswordTransformer()).pipe(res);
});

app.get(`/${USERS}/:id`, (req, res) => {
  console.log(req.params);
});

// app.use('/users', userRouter);

module.exports = app;
