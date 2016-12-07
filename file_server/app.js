var express = require('express');
var app = express();
var path = require('path');

var handlePost = function(req, res) {
  var body = [];
  var length= 0;
  req.on('data', function(chunk) {
    body.push(chunk);
    length += chunk.length;
  });
  req.on('end', function() {
    var realBody = Buffer.concat(body, length);
    console.log("Buffer of length " + realBody.length);
    res.set('Access-Control-Allow-Origin', '*');
    res.send(realBody);
  });
}

app.post('/post/16', handlePost);
app.post('/post/64', handlePost);
app.post('/post/256', handlePost);
app.post('/post/1024', handlePost);

app.listen(3000, function() {
  console.log('File server listening on port 3000');
});
