const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5b7e869d638324a43becba6e11';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// // ha nincs, empty array
// Todo.find({
//   _id: id // automatic casting to ObjectID
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// // return 1 document at most, first one
// // ha nincs -> return null
// Todo.findOne({
//   _id: id // automatic casting to ObjectID
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// // ha Id szerint keresünk, mindig ezzel
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

var userId = '5b7c135f80f292a44a0ed67a';

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('User not found');
  }
  console.log('User By Id', user);
}).catch((e) => console.log(e));
