'use strict';

var express = require('express');
var http = require('http');
var socketIO = require('socket.io');

var config = require('./config.js');
var pwms = require(config.pwmsFile);
var serverStarter = require('./server-starter.js');

let app = express();
let server = http.Server(app);
let io = socketIO(server);

io.on('connection', socket => {
  console.log('a user connected');
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

serverStarter(server, config.server, (err, data) => {
  if (err) throw err;
  console.log('Listening:', data);
});
