require('./config/config.js');

const _ = require('lodash');
const express  = require('express');
// JSON to Object
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose'); // {}-ban: mongoose propertyt szedi ki és az lesz itt a neve
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;  // process.env.PORT heroku adja, ha nincs akkor 3000 (localhost)

// middleware, kérések előtt fut le -> kérésnek már az object megy
app.use(bodyParser.json());

// Creating new todo
app.post('/todos', (req, res) => {
  // console.log(req.body); // body a bodyPraserből jön
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET /todos/12312423
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
     return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id;

  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
     return res.status(404).send();
  }

  // remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
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

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(400).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () =>{
  console.log(`Started on port ${port}`);
})

module.export = {app};
