const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB);

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('Mongo DB connected');
});

connection.on('error', (err) => {
  console.log('Mongo DB connected failed');
});

module.exports = connection;
