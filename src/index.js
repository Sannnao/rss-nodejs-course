const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 4000;

const { USERS } = require('./constants/entities');

const filePath = path.resolve(__dirname, './src/temp-db/', `${USERS}.json`);

app.post(`/${USERS}`, (req, res) => {
  fs.createWriteStream(filePath, req.params);
});

app.get('/users/', (req, res) => {
  // console.log(req.params.id);
  const readStream = fs.createReadStream(filePath);
  res.set('Content-Type', 'application/json');
  readStream.pipe(res);
});

app.listen(PORT, () => console.log(`Connected. Listen on port: ${PORT}`));
