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

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete: remove item and return
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({name: 'Barna'}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5b796979524d133f148ff737')}).then((result) => {
    console.log(result);
  });

  //db.close();
});
