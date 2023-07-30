const http2 = require('http2');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

app.use(auth, router);
app.post('/signin', login);
app.post('/signup', createUser);
app.use('*', (req, res) => {
  res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Ресурс не найден' });
});
mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT} port`);
});
