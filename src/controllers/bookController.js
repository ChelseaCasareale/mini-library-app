var bookController = function(Book, bookService, nav) {
  var middleware = function(req, res, next) {
    // if (!req.user) {
    //   res.redirect('/');
    // } else {
    next();
    // }
  };

  var getIndex = function(req, res) {
    var query = {};

    Book.find(query, function(err, books) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.render('bookListView', {
          nav: nav,
          books: books
        });
      }
    });
  };

  var getById = function(req, res) {
    bookService.getBookByTitle(req.book.title, function(err, book) {
      res.render('bookView', {
        nav: nav,
        grBook: book,
        book: req.book
      });
    });
  };

  var getBookToEdit = function(req, res) {
    res.render('bookEdit', {
      nav: nav,
      book: req.book
    });
  };

  var patchBook = function(req, res) {
    if (req.body.id) {
      delete req.body.id;
    }

    for (var p in req.body) {
      req.book[p] = req.body[p];
    }
    req.book.save(function(err) {
      if (err) {
        res.redirect('/books');
      } else {
        res.redirect('/books');
      }
    });
  };

  var postBook = function (req, res) {
    var book = new Book(req.body);
    book.save(function(err) {
      if (err) {
        res.redirect('/books');
      } else {
        res.redirect('/books');
      }
    });
  };

  var deleteBook = function(req, res) {
    req.book.remove(function(err) {
      if (err) {
        res.redirect('/books');
      } else {
        res.redirect('/books');
      }
    });
  };

  return {
    getIndex: getIndex,
    getById: getById,
    getBookToEdit: getBookToEdit,
    patchBook: patchBook,
    postBook: postBook,
    deleteBook: deleteBook,
    middleware: middleware
  };
};

module.exports = bookController;
