var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session'),
    methodOverride = require('method-override');

var Book = require('./src/models/bookModel.js');
var User = require('./src/models/userModel.js');

var app = express();

var db;

if (process.env.ENV === 'Test') {
  db = mongoose.connect('mongodb://localhost/libraryApp_test');
} else {
  db = mongoose.connect('mongodb://localhost/libraryApp');
}

var port = process.env.PORT || 5000;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Allows PATCH/PUT/DELETE method for a form
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: 'library',
  resave: true,
  saveUninitialized: false
}));

require('./src/config/passport')(app, User);

app.set('views', './src/views');
app.set('view engine', 'ejs');

var nav = [{
  Link: '/books',
  Text: 'Books'
}];

var bookRouter = require('./src/routes/bookRoutes.js')(Book, nav);
var adminRouter = require('./src/routes/adminRoutes.js')(Book);
var authRouter = require('./src/routes/authRoutes.js')(User);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function(req, res) {
  res.render('index', {
    nav: nav
  });
});

app.get('/profile', function(req, res) {
  res.render('profile', {
    nav: nav
  });
});

app.listen(port, function(err) {
  console.log('running server on port ' + port);
});







// var mysql = require('mysql2');
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'gotan132',
//   database: 'books'
// });
//
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//
//   console.log('connected as id ' + connection.threadId);
// });
