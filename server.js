'use strict';

// required packages
var express = require("express");
var bodyParser = require("body-parser");
var setupRoutes = require('./route.js');
var cors = require('cors');
var mongoose = require('mongoose');

// set up app with middlewares
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(function(req, res, next){
  console.log("[Server] %s -> %s", req.method, req.url);
  if (next) {
    next();
  }
});
app.use(cors());
//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// connect to database
var path = process.env.MONGOHQ_URL + "/bitrun";
mongoose.connect(path);

mongoose.connection.on("error", function() {
  console.error.bind("[MongoDB] Connection Failed: ");
});

mongoose.connection.once("open", function() {
  console.log("[MongoDB] Connection Success: %s", path);
});

setupRoutes(app, io);

//Server Listening to Port
var server = http.listen((process.env.PORT || 5000), function(){
  console.log("[Server] Listening at %s", server.address().port);
});

module.exports = app;
