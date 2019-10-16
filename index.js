const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.time('Request');
  console.log(`Metodo: ${req.method}: Url: ${req.url}`);

  next();
  console.timeEnd('Request');
});

app.use(routes);

module.exports = app;
