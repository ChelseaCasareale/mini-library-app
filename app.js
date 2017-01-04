var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var methodOverride = require('method-override');


var app = express();

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

var port = process.env.PORT || 5000;

var nav = [{
  Link: '/books',
  Text: 'Books'
// },
// {
//   Link: '/authors',
//   Text: 'Authors'
}];

var bookRouter = require('./src/routes/bookRoutes.js')(nav);
var adminRouter = require('./src/routes/adminRoutes.js')(nav);
var authRouter = require('./src/routes/authRoutes.js')();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

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

require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

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
