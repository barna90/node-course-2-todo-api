const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

  return user.save().then(() => {
    return token;
  });
};

// model method (<--> instance method)
// regular function because of this
UserSchema.statics.findByToken = function(token) {
  var User = this;  // this = model (nem instance mint instance methodnál)
  var decoded;

  // token decode
  // mert jwt verify errort dob bármi van
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });  ===
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token, //it tokens property
    'tokens.access': 'auth'
  });
};

// run code before save event, aztán nextet hívni
UserSchema.pre('save', function (next) {
  var user = this;

  // return true if password is modified, false if not
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    });
  } else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};
