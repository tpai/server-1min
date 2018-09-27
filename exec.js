#!/usr/bin/env node

const path = require('path');
const WebServer = require(path.resolve(__dirname, 'index'));
const { file } = require(path.resolve(__dirname, 'args'));
const routes = require(path.resolve(__dirname, file));
const server = new WebServer(routes);
server.start();
