var mongoose = require('mongoose');

// Mongoose configure
// melyik promise-t akarja használni
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
};
