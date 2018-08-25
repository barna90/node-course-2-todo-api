var {User} = require('./../models/user');

// x-auth alapján megkeresi a usert, majd hozzáaadja requesthez, aztán next és benne lesz már a requestben
var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
