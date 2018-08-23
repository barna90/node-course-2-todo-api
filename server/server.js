var express  = require('express');
// JSON to Object
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose'); // {}-ban: mongoose propertyt szedi ki és az lesz itt a neve
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;  // process.env.PORT heroku adja, ha nincs akkor 3000 (localhost)

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

app.listen(port, () =>{
  console.log(`Started on port ${port}`);
})

module.export = {app};
