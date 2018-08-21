var express  = require('express');
// JSON to Object
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose'); // {}-ban: mongoose propertyt szedi ki és az lesz itt a neve
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

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

app.listen(3000, () =>{
  console.log('Started on port 3000');
})
