var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.raw({limit: '2000kb'}));

var curriedGetResponse = function(size) {
  return function(req, res) {
    var options = {
      root: __dirname,
      lastModified: false,
      cacheControl: false,
      headers: {
        'Transfer-Encoding': 'identity',
        'Content-Encoding': 'identity',
        'Content-Length': sizeOctets,
        'Access-Control-Allow-Origin': '*',
      }
    };
    res.sendFile(size + 'kb.dat', options, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Sent file of size ' + size + ' kb!');
      }
    });
  }
};

var curriedPostResponse = function(size) {
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
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': false,
      'Content-Length': sizeOctets,
      'Access-Control-Allow-Origin': '*',
    });
    res.write(req.body);
    res.end();
  }
}

app.get('/get/16', curriedGetResponse('16'));
app.get('/get/64', curriedGetResponse('64'));
app.get('/get/256', curriedGetResponse('256'));
app.get('/get/1024', curriedGetResponse('1024'));

app.post('/post/16', curriedPostResponse('16'));
app.post('/post/64', curriedPostResponse('64'));
app.post('/post/256', curriedPostResponse('256'));
app.post('/post/1024', curriedPostResponse('1024'));

app.listen(3000, function() {
  console.log('File server listening on port 3000');
});
