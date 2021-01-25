const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', () => {
  console.error('mongo db error in connection');
});
db.once('open', () => {
  console.error('mongo db connection established');
});

class Database {
  constructor() {
    // eslint-disable-next-line max-len
    let db = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_SERVER}`;

    if (process.env.MONGO_AUTH_DISABLE) {
      db = 'mongodb://localhost:27017/todo-app'
    }

    this.url = db;
    console.log('Database', this.url);
    mongoose.Promise = global.Promise;
  }

  connect() {
    return mongoose.connect(this.url, {
      autoIndex: false,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    }, (error) => {
      if (error) {
        console.log('MongoDB Connection error:', error);
        process.exit(1);
      }
    });
  }
}

module.exports = Database;