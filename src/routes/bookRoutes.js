var express = require('express');
var mongodb = require('mongodb').MongoClient;
var bookRouter = express.Router();
var ObjectId = require('mongodb').ObjectID;

var router = function(nav) {
  var bookService = require('../services/goodreadsService')();
  var bookController = require('../controllers/bookController')(bookService, nav);

  bookRouter.use(bookController.middleware);


/***** GET BOOK LIST *****/
  bookRouter.route('/')
    .get(bookController.getIndex);

/***** ADD BOOK *****/
// Get route for page
  bookRouter.route('/add-books')
    .get(function(req, res) {
      res.render('bookAdd', {
        nav: nav
      });
    });

// Post book to database
  bookRouter.route('/add-books/post')
    .post(bookController.postBook);


/***** GET BOOK BY ID AND EDIT ENTRY *****/
// Get individual book page
  bookRouter.route('/:id')
    .get(bookController.getById);

// Get edit page for individual book
  bookRouter.route('/:id/edit-book')
    .get(bookController.getBookToEdit);

// Patch book data to database
  bookRouter.route('/:id/edit-book/patch')
    .patch(bookController.patchBook);



  return bookRouter;
};

module.exports = router;
