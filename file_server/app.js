var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
  var options = { root: __dirname, lastModified: false, cacheControl: false};
  res.sendFile('garbage.dat', options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent!');
    }
  });
});

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});
