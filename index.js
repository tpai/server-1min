const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const { port } = require(path.resolve(__dirname, 'args'));

function WebServer (routes = []) {
  routes.map(({
    method: requestMethod = 'get',
    path = '/',
    callbacks,
  }) => {
    const method = requestMethod.toLowerCase();
    const options = [].concat([path], callbacks);
    app[method](...options);
  });
}

WebServer.prototype.start = function () {
  http.listen(port, () => {
    console.log(`Listening http://localhost:${port}`);
  });
};

module.exports = WebServer;
