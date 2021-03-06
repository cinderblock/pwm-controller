# pwm-controller
An interface for managing sysfs pwm channels

## Installation

Clone git repo and run `npm install`:

```
git clone https://github.com/cinderblock/pwm-controller.git
cd pwm-controller
npm install
```

`npm install` will also run webpack and generate a folder `webpack` to serve static files from.

## Run Server

Using npm to start the server ensures that configuration options are loaded.

```
npm run server
```

## Development

Server with nodemon:
```
npm run server-dev
```

Client webpack watch server:
```
npm run client-dev -- --open # --open to automatically open browser
```

## Configuration

Can be configured to run on ports other than 9000 with `npm config set ...`

```
# Change default port
npm config set pwm-controller:port 9001

# Set address to bind to
npm config set pwm-controller:hostname 127.0.0.1
```

It is also possible to use a unix socket instead:
```
npm config set pwm-controller:socket /path/to/file.sock
```

If using a unix socket, you can specify a mode sting to pass to chmod to set correct file permissions on the created socket.

```
npm config set pwm-controller:socketmode 666
```
