var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
  {
    title: 'Lolita',
    author: 'Vladimir Nabokov'
  },
  {
    title: 'Harry Potter and the Sorceror\'s Stone',
    author: 'J.K. Rowling'
  },
  {
    title: 'Lord of the Rings: The Fellowship of the Rings',
    author: 'J.R.R Tolkien'
  }
];

var router = function(nav) {
  adminRouter.route('/addBooks')
    .get(function(req, res) {
      var url = 'mongodb://localhost:27017/libraryApp';
      mongodb.connect(url, function(err, db) {
        var collection = db.collection('books');
        collection.insertMany(books, function(err, results) {
          res.send(results);
          db.close();
        });
      });
    });
  return adminRouter;
};

module.exports = router;
