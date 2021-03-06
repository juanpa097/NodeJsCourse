var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(cookieParser('12345-67890-09876-54321')); // Signed Key

function auth (req, res, next) {
  console.log(req.headers);

  var authHeader = req.headers.authorization;

  if (!req.signedCookies.user) {
    if (!authHeader) {
      var err = new Error('You are not authenticated');
      err.status = 401;
      next(err);
      return;
    }

    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    if (user == 'admin' && pass == 'password') {
      res.cookie('user','admin', {signed: true}); // Gives the cookie to the client.
      next(); // authorized
    } else {
      var err = new Error('You are not authenticated');
      err.status = 401;
      next(err);
    }
  } else {
    if (req.signedCookies.user === 'admin') {
      console.log(req.signedCookies);
      next(); // Continue
    }
  }
}
// This level is the "main methon"
app.use(auth); // Uses the middle ware we created

app.use(express.static(__dirname + '/public'));

app.use(function(err, req, res, next) {
  res.writeHead(err.status || 500, {
    'WWW-Authenticate': 'Basic',
    'Content-Type': 'text/plane'
  });
  res.end(err.message);
});

app.listen(port, hostname, function() {
  console.log('Server running at http://' + hostname + ':' + port +'/');
});
