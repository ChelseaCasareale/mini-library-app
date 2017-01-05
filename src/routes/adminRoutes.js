var express = require('express');
var adminRouter = express.Router();
var mongoose = require('mongoose');
var BookSchema = require('mongoose').model('Book').schema;


var router = function(Book) {
  adminRouter.route('/addBooks')
    .get(function(req, res) {
      var Book = mongoose.model('Book', BookSchema);

      var books = [
        {
          title: 'Lolita',
          author: 'Vladimir Nabokov',
          genre: 'Fiction',
          read: true
        },
        {
          title: 'Harry Potter and the Sorceror\'s Stone',
          author: 'J.K. Rowling',
          genre: 'Fantasy',
          read: true
        },
        {
          title: 'Lord of the Rings: The Fellowship of the Rings',
          author: 'J.R.R Tolkien',
          genre: 'Fantasy',
          read: true
        }
      ];

      Book.collection.insert(books, onInsert);

      function onInsert(err, docs) {
          if (err) {
              console.log('error');
          } else {
              console.info('%d books were successfully stored.', docs.length);
              res.redirect('/');
          }
      }
    });
  return adminRouter;
};

module.exports = router;
