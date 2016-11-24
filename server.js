// Setup basic express server
var http = require('http');
var path = require('path');

var async = require('async');
var express = require('express');


var app = express();
var server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'public')));

server.listen(8080,  "0.0.0.0", function () {
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
