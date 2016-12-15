var express = require('express');

var app = express();
var port = 3000;

var server = app.listen(port);

app.use(express.static('public'));

if (server) {
    console.log("server running at port: " + port);
}