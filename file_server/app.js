var express = require('express');
var app = express();
var path = require('path');

var handlePost = function(req, res) {
	var body = [];
	req.on('data', function(chunk) {
			body.push(chunk);
			});
	req.on('end', function() {
			var realBody = Buffer.concat(body);
			res.set('Access-Control-Allow-Origin', '*');
			res.send(realBody);
			});
}

app.post('/post/16', handlePost();
app.post('/post/64', handlePost();
app.post('/post/256', handlePost();
app.post('/post/1024', handlePost();

app.listen(3000, function() {
  console.log('File server listening on port 3000');
});
