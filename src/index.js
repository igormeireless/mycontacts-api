const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const port = 3001;
const app = express();

app.use(express.json());
app.use(routes);
app.use((error, request, response, next) => {
  console.log('#### Error handler');
  console.log(error);
  response.sendStatus(500);
});

app.listen(port, () => console.log(`🚀 Server started at http://localhost:${port}`));
