var mongoose = require('mongoose');

// Mongoose configure
// melyik promise-t akarja használni
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
};
