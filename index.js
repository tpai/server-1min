const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const { port } = require(path.resolve(__dirname, 'args'));

function WebServer (routes = []) {
  routes.map(({
    method = 'GET',
    path = '/',
    callbacks,
  }) => {
    app[method.toLowerCase()](path, ...callbacks);
  });
}

WebServer.prototype.start = function () {
  http.listen(port, () => {
    console.log(`Listening http://localhost:${port}`);
  });
};

module.exports = WebServer;
