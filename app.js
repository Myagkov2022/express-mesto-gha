const express = require('express');
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
mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT} port`);
});
