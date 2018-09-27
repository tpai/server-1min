module.exports = [
  {
    method: 'USE',
    callbacks: [
      (req, res, next) => {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('x-timestamp', new Date().getTime());
        next();
      },
    ],
  }, {
    method: 'GET',
    path: '/',
    callbacks: [
      (req, res) => {
        res.status(200).send('<h1>It worked!</h1>');
      },
    ],
  }
];
