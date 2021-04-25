const http = require('http');
const route = require('./prove01-routes');

const server = http.createServer(route.handler);

server.listen(3000);