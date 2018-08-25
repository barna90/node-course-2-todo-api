var env = process.env.NODE_ENV || 'development'; // configure in package.JSON

if (env === 'development' || env === 'test') {
  // dev and test configs, nem lesz commitolva gitre
  var config = require('./config.json'); // automatically parse it to javascript object
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}

// ===
// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
// } else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
// }
