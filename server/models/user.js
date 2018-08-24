const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// {
//   email: 'barna90@gmail.com',
//   password: 'somehash',
//   tokens: [{  // array of object to login
//     access: 'auth',
//     token: 'asdsadsadasd' // kéréseknél ez megy
//   }]
// }

// stores all of the properties of the user
// modell létrehozásakor ezt adjuk át
// schemanak kell egy object -> definiáljuk dokumentumot
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      // ===
      // validator: (value) => {
      //   return validator.isEmail(value);
      // },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
}, {
  usePushEach: true
});

// Mongoose model to JSON override method
UserSchema.methods.toJSON = function () {
  var user = this;
  // convert model to regular object
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// this miatt nem arrow function (this =  individual document), arrow functionnál nem az a this
// UserSchema.methods = instance methods -> have access to the individual document
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString(); // majd configba  secretet

  //user.tokens.push({access, token});

  user.tokens = user.tokens.concat({access, token});

  console.log(user);

  return user.save().then(() => {
    console.log('saved');
    return token;
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};
