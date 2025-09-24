const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];

  console.log(`[${new Date().toLocaleString('id-ID')}]`);
  console.log(`IP        : ${ip}`);
  console.log(`Method    : ${req.method}`);
  console.log(`URL       : ${req.originalUrl}`);
  console.log(`UserAgent : ${userAgent}`);
  console.log('------------------------------');

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
