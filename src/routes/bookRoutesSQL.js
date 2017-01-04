var express = require('express');
var bookRouter = express.Router();
var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'gotan132',
  database: 'books'
});

var router = function(nav) {
  bookRouter.route('/')
    .get(function(req, res) {
      connection.query('SELECT * FROM `book_list`', function(error, results) {
        if (error) {
          throw error;
        } else {
          res.render('bookListView', {
            nav: nav,
            books: results
          });
        }
      });
    });

  bookRouter.route('/:id')
    .get(function(req, res) {
      var id = req.params.id;
      connection.execute('SELECT * FROM `book_list` WHERE `id` = ?', id, function (err, results) {
        if (err) {
          throw err;
        } else {
          res.render('bookView', {
            nav: nav,
            book: results[0]
          });
        }
      });
    });

  return bookRouter;
};

module.exports = router;
