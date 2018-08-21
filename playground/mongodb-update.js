//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // az előzővel ugyanaz a kód

// err: vagy létezik vagy nem
//db: read, write data
// TodoApp: nem kell újat csinálni, ha nincs, létrehozza, amint adatokat adunk hozzá
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    // return prevent rest of the function to execute
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // Update operators
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b79603819afd326d8d5a3a8')
  }, {
      $set: {
        name: 'Barna'
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    }).then((result) => {
      console.log(result);
  });

  //db.close();
});
