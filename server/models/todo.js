var mongoose = require('mongoose');

// Modell készítés
var Todo = mongoose.model('Todo', {
  text: {
    type: String, // ha számot/mást adunk meg, stringgé kasztolja
    required: true,
    minlength: 1,
    trim: true // remove beginning trailing spaces
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};
