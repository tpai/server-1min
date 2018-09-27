# 1 Minute Server

Launch node server in 1 minute.

## Features

- No more complex server code.
- Only need to define routing rules.
- Support NPX

## Usage

Start webhook server with custom routing rules

```
npx server-1min -f ./routes.js
```

Start server with specific port

```
npx server-1min -p 8080
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

Webhook

```js
const util = require('util');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = [{
  method: 'POST',
  path: '/webhook',
  callbacks: [
    jsonParser(),
    (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    },
    (req, res) => {
      if (!req.files)
        return res.status(400).send('No files were uploaded.');

      let file = req.files.file;

      file.mv(path.resolve(__dirname, 'image.jpg'), (err) => {
        if (err)
          return res.status(500).send(err);

        res.send('File uploaded!');
      });
    },
  ],
}];
```
