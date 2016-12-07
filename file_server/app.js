var express = require('express');
var app = express();
var path = require('path');

var parseBody = function(req, res, next) {
  var body = [];
  req.on('data', function(chunk) {
    body.push(chunk);
  });
  req.on('end', function() {
    req.body = Buffer.concat(body);
    next();
  });
}
app.use(parseBody);

var handlePost = function(size) {
  sizeOctets = 0;
  switch(size) {
    case '16':
      sizeOctets = 2048;
    case '64':
      sizeOctets = 8192;
    case '256':
      sizeOctets = 32768;
    case '1024':
      sizeOctets = 131072;
  }
  return function(req, res) {
    console.log("Received body " + size);
    res.send(req.body);
  }
}

app.post('/post/16', handlePost('16'));
app.post('/post/64', handlePost('64'));
app.post('/post/256', handlePost('256'));
app.post('/post/1024', handlePost('1024'));

app.listen(3000, function() {
  console.log('File server listening on port 3000');
});
