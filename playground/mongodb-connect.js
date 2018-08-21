//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // az előzővel ugyanaz a kód

// object destructering
var user = {name: 'Barna', age: 27};
// make new variables from object properties
var {name} = user;
console.log(name);

// err: vagy létezik vagy nem
//db: read, write data
// TodoApp: nem kell újat csinálni, ha nincs, létrehozza, amint adatokat adunk hozzá
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    // return prevent rest of the function to execute
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //param 1: collection name
  // db.collection("Todos").insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   // ops: all of docs that were inserted
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection("Users").insertOne({
  //   name: 'Barna',
  //   age: 27,
  //   location: 'Taksony'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   // ops: all of docs that were inserted
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  // });

  db.close();
});
