const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}) ~ Todo.find
// Todo.remove({}) -> deletes everything

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

//Todo.findOneAndRemove returns doc
//Todo.findByIdAndRemove returns doc

Todo.findOneAndRemove({_id: '5b7eb850e03c89dd36614552'}).then((todo) => {

});

Todo.findByIdAndRemove('5b7eb850e03c89dd36614552').then((todo) => {
  console.log(todo);
});
