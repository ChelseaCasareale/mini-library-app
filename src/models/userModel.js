var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
  username: {
    type: String,
    required: [true, 'Enter a username']
  },
  password: {
    type: String,
    required: [true, 'Enter a password']
  }
});

module.exports = mongoose.model('User', userModel);
