const commandLineArgs = require('command-line-args');

var cmd = commandLineArgs([
  {name: 'development', alias: 'd', type: Boolean},
]);

var config = {
  pwmsFile: process.env.npm_package_config_pwmsfile || '../pwms.json',
  server: {
    listen: process.env.npm_package_config_socket || process.env.npm_package_config_port || 9000,
    hostname: process.env.npm_package_config_hostname,
    socketMode: process.env.npm_package_config_socketmode || process.env.socketmode,
  },
  client: {
    serverOrigin: process.env.npm_package_config_serverorigin || '',
  },
  development: cmd.development || process.env.npm_package_config_development || process.env.development,
};

module.exports = config;
