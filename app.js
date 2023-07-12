const express = require('express');
const http2 = require('http2');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64a951a40546ee9d478ac6e5', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(router);
app.use('*', (req, res) => {
  res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Ресурс не найден' });
});
mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT} port`);
});
