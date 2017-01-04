var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function(bookService, nav) {
  var middleware = function(req, res, next) {
    // if (!req.user) {
    //   res.redirect('/');
    // } else {
    next();
    // }
  };

  var getIndex = function(req, res) {
    var url = 'mongodb://localhost:27017/libraryApp';
    mongodb.connect(url, function(err, db) {
      var collection = db.collection('books');

      collection.find({})
          .toArray(function(err, results) {
            res.render('bookListView', {
              nav: nav,
              books: results
            });
          });
    });
  };

  var getById = function(req, res) {
    var id = new ObjectId(req.params.id);
    var url = 'mongodb://localhost:27017/libraryApp';
    mongodb.connect(url, function(err, db) {
      var collection = db.collection('books');

      collection.findOne({_id: id}, function(err, results) {
        if (results.title) {
          bookService.getBookByTitle(results.title, function(err, book) {
            results.book = book;
            res.render('bookView', {
              nav: nav,
              book: results
            });
          });
        } else {
          res.render('bookView', {
            nav: nav,
            book: results
          });
        }
      });
    });
  };

  var getBookToEdit = function(req, res) {
    var id = new ObjectId(req.params.id);
    var url = 'mongodb://localhost:27017/libraryApp';
    mongodb.connect(url, function(err, db) {
      var collection = db.collection('books');

      collection.findOne({_id: id}, function(err, results) {
        console.log(results);
        res.render('bookEdit', {
          nav: nav,
          book: results
        });
      });
    });
  };

  var patchBook = function(req, res) {
    var updateObject = req.body;
    var url = 'mongodb://localhost:27017/libraryApp';
    console.log(updateObject);
    var id = new ObjectId(req.params.id);
    console.log(id);

    mongodb.connect(url, function(err, db) {
      var collection = db.collection('books');
      collection.updateOne({_id: id }, {$set: updateObject}, function(err, result) {
        res.redirect('/books');
      });
    });

  };

  var postBook = function (req, res) {
    var url = 'mongodb://localhost:27017/libraryApp';
    mongodb.connect(url, function(err, db) {
      var collection = db.collection('books');

      var book = {
        title: req.body.title,
        author: req.body.author
      };

      collection.insert(book, function(err, results) {
        res.redirect('/books');
      });
    });
  };

  return {
    getIndex: getIndex,
    getById: getById,
    getBookToEdit: getBookToEdit,
    patchBook: patchBook,
    postBook: postBook,
    middleware: middleware
  };
};

module.exports = bookController;
