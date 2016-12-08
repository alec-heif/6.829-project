var express = require('express');
var app = express();
var path = require('path');

var curriedGetResponse = function(size) {
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
    var options = {
      root: __dirname,
      lastModified: false,
      cacheControl: false,
      headers: {
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

var handlePost = function(req, res) {
  var body = [];
  var length= 0;
  req.on('data', function() {
    // do nothing...
  });
  req.on('end', function() {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200);
    res.end();
  });
}

app.post('/post/16', handlePost);
app.post('/post/64', handlePost);
app.post('/post/256', handlePost);
app.post('/post/1024', handlePost);

app.get('/get/16', curriedGetResponse('16'));
app.get('/get/64', curriedGetResponse('64'));
app.get('/get/256', curriedGetResponse('256'));
app.get('/get/1024', curriedGetResponse('1024'));

app.listen(3000, function() {
  console.log('File server listening on port 3000');
});
