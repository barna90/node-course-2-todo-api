require('./config/config.js');

const _ = require('lodash');
const express  = require('express');
// JSON to Object
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose'); // {}-ban: mongoose propertyt szedi ki és az lesz itt a neve
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

const bcrypt = require('bcryptjs');

var app = express();
const port = process.env.PORT;  // process.env.PORT heroku adja, ha nincs akkor 3000 (localhost)

// middleware, kérések előtt fut le -> kérésnek már az object megy
app.use(bodyParser.json());

// Creating new todo
app.post('/todos', authenticate, (req, res) => {
  // console.log(req.body); // body a bodyPraserből jön
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id  //authenticate middleware-ből jön
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id  // ez biztosítja h az ownerek találják meg csak a saját todo-ikat
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET /todos/12312423
app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
     return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => res.status(400).send());
});

app.delete('/todos/:id', authenticate, (req, res) => {
  // get the id
  var id = req.params.id;

  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
     return res.status(404).send();
  }

  // remove todo by id
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => res.status(400).send());
});

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']); // pull of properties we want from the object ~ mappeléshez és csak azt updateli ami meg van adva

  if (!ObjectID.isValid(id)) {
     return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();  //JS timestampt
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(400).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

// POST /users
// sign up (/login majd) -> return token (generálni kell)
app.post('/users', (req, res) => {
  // console.log(req.body); // body a bodyPraserből jön
  var body = _.pick(req.body, ['email', 'password']); // pull of properties we want from the object ~ mappeléshez és csak azt updateli ami meg van adva

  var user = new User(body);

  // User.findByToken()  // return user to the caller via token -> model methods -> dont require individual document, pl. findByToken: custom model method
  // user.generateAuthToken -> instance methods, adding token to the individual user document, save it, send it back

  user.save().then(() => {
    return user.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).send(user); //x- custom header
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// require authentication = private route
// find associate user, send it back
// calling middleware
app.get('/users/me', authenticate, (req, res) => {
  // var token = req.header('x-auth'); // fetch x-auth
  //
  // User.findByToken(token).then((user) => {
  //   if (!user) {
  //     return Promise.reject();  //catch-be megy egyből nem fut tovább
  //   }
  //
  //   res.send(user);
  // }).catch((e) => {
  //   res.status(401).send();
  // }); // take the token value, find associate user
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () =>{
  console.log(`Started on port ${port}`);
})

module.export = {app};
