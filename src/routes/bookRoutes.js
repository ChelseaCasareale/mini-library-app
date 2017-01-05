var express = require('express');
var bookRouter = express.Router();

var router = function(Book, nav) {
  var bookService = require('../services/goodreadsService')();
  var bookController = require('../controllers/bookController')(Book, bookService, nav);

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
bookRouter.use('/:id', function(req, res, next) {
  Book.findById(req.params.id, function(err, book) {
    if (err) {
      res.status(500).send(err);
    } else if (book) {
      req.book = book;
      console.log(req.book);
      next();
    } else {
      res.status(404).send('no book found');
    }
  });
});

// Get individual book page
  bookRouter.route('/:id')
    .get(bookController.getById);

  bookRouter.route('/:id/delete')
    .get(bookController.deleteBook);

// Get edit page for individual book
  bookRouter.route('/:id/edit-book')
    .get(bookController.getBookToEdit);

// Patch book data to database
  bookRouter.route('/:id/edit-book/patch')
    .patch(bookController.patchBook);



  return bookRouter;
};

module.exports = router;
