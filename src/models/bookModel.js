var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookModel = new Schema({
  title: {
    type: String,
    required: [true, 'Your book needs a title!']
  },
  author: {
    type: String,
    required: [true, 'Your book needs an author!']
  },
  genre: {
    type: String
    // required: [true, 'Your book needs a genre']
  },
  read: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Book', bookModel);
