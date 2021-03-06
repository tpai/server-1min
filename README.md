# 1 Minute Server

Launch node server instantly with one line command.

## Features

- No more complex server code.
- Only need to define routing rules.
- Keep your working directory clean.

## Usage

Start server with custom routing rules and serve at port 8080.

```
npx server-1min -p 8080 -f $(pwd)/routes.js
```

## Samples

Web Server

```js
const path = require('path');
const express = require('express');

module.exports = [{
  method: 'USE',
  path: '/static',
  callbacks: [
    express.static(path.resolve(__dirname, 'public/static')),
  ],
}, {
  method: 'GET',
  path: '/',
  callbacks: [
    express.static(path.resolve(__dirname, 'public')),
  ],
}];
```

Webhook inspector

```js
const util = require('util');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = [{
  method: 'POST',
  path: '/webhook',
  callbacks: [
    jsonParser,
    (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    },
    (req, res) => {
      console.log(util.inspect(req.body, false, null, true));
      res.status(200).send(req.body);
    },
  ],
}];
```

Single file upload

```js
const path = require('path');
const fileUpload = require('express-fileupload');

module.exports = [{
  method: 'POST',
  path: '/upload',
  callbacks: [
    fileUpload(),
    (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    },
    (req, res) => {
      if (!req.files) {
        return res.status(400).send('No files were uploaded.');
      }

      const { file } = req.files;

      file.mv(path.resolve(__dirname, file.name), (err) => {
        if (err)
          return res.status(500).send(err);

        res.send('File uploaded!');
      });
    },
  ],
}];
```
