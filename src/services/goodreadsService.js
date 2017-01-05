var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});

var goodreadsService = function() {
  var getBookByTitle = function(title, cb) {
    title = title.replace(/\s/g, '+');

    var options = {
      host: 'www.goodreads.com',
      path: '/book/title.xml?key=LL6pybduhxrjPW1fF5Voow&title=' + title
    };

    var callback = function(response) {
      var str = '';

      response.on('data', function(chunk) {
        str += chunk;
      });

      response.on('end', function() {
        // console.log(str);
        parser.parseString(str, function(err, result) {
          cb(null, result.GoodreadsResponse.book);
        });
      });
    };
    http.request(options, callback).end();
  };

  return {
    getBookByTitle: getBookByTitle
  };
};

module.exports = goodreadsService;
