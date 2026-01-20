const dotenv = require('dotenv');
dotenv.config({override: true});
const { MongoClient } = require('mongodb');

let _db;



const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return callback(new Error('MongoDB connection string is not defined in environment variables.'))
  }

MongoClient.connect(uri)
    .then((client) => {
      _db = client.db();
      console.log('Connected to MongoDB successfully!');
      callback(null, _db);
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized. Call initDB first');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};