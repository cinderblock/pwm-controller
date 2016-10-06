'use strict';

var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var pwm = require('pwm');
var webpackMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');

var config = require('./config.js');
var pwms = require(config.pwmsFile);
var serverStarter = require('./server-starter.js');

let app = express();
let server = http.Server(app);
let io = socketIO(server);

for (var id in pwms) {
  if (!pwms.hasOwnProperty(id)) continue;
  pwms[id].device = pwm.export(pwms[id].channel, pwms[id].channel, () => {
    io.sockets.emit('pwmId', id);
  });
}

if (config.development) {
  app.use(webpackMiddleware(webpack(require('../webpack.config.js')), {
    publicPath: '/',
    stats: {
      colors: true,
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: true,
    },
  }));
}

io.on('connection', socket => {
  socket.on('command', command => {
    console.log(command);
    if (!command.id || !pwms[command.id]) return;
    if (command.type == 'reset') {
      pwms[command.id].device.reset();
    } else if (command.type == 'enable') {
      pwms[command.id].device.setEnable(command.data || 1, () => {});
    } else if (command.type == 'period') {
      pwms[command.id].device.setPeriod(command.data, () => {});
    } else if (command.type == 'duty') {
      pwms[command.id].device.setDutyCycle(command.data, () => {});
    }
  });
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

serverStarter(server, config.server, (err, data) => {
  if (err) throw err;
  console.log('Listening:', data);
});
