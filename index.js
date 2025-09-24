const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3000;

app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Terlalu banyak request, coba lagi nanti.',
});

app.use(limiter);
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];

  console.log(
    `[${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}]`
  );
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
