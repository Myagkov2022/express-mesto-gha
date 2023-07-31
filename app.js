const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorsHandler = require('./middlewares/errors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(router);

app.use(errors());
app.use(errorsHandler);
mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT} port`);
});
