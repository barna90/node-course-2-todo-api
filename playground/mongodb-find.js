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

  // find -> return mongodb cursor
  // db.collection('Todos').find({
    //_id: new ObjectID('...')
  //}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // find -> return mongodb cursor
  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({
    name: 'Barna'
  }).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  //db.close();
});
