
var serverStarter = (server, config, callback) => {
  var StartListening = server.listen.bind(
    server,
    config.listen,
    config.hostname);

  server.on('listening', () => {
    var addr = server.address();
    if (addr.port && (addr.port > 0)) {
      // listening on a port
    } else {
      // listening on a socket
      if (config.socketMode) fs.chmodSync(addr, config.socketMode);
    }
    callback(null, {addr});
  });

  // If there is an error, it is very likely that it is because our old socket
  // is still around. Check if it is still alive and if not, remove it and start
  // again.
  server.on('error', err => {
    if (err.code == 'EADDRINUSE') {
      if (err.port > 0) {
        callback(`Address (${err.address} ${err.port}) already in use.`, err);
      } else if (err.address) {
        // Try to connect. If not running, remove and continue.
        var clientSocket = new net.Socket();

        clientSocket.on('error', e => {
          if (e.code == 'ECONNREFUSED') {
            fs.unlinkSync(err.address);
            StartListening();
          }
        });
        clientSocket.connect({path: err.address}, () => {
          callback('Server running. Giving up...', err);
          clientSocket.unref();
        });
      } else {
        throw err;
      }
    } else {
      throw err;
    }
  });

  StartListening();
};

module.exports = serverStarter;
