const { MONGO_CONNECTION_STRING } = require('../common/config');

const connectToDb = (serverStart) => {
  const mongoose = require('mongoose');
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    // we're connected!
    console.log("we're connected");
    serverStart();
  });
};

module.exports = { connectToDb };
