const http2 = require('http2');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');
// const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errors');
const validateURL = require('./middlewares/validateURL');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(router);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL, 'url validation'),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use('*', (req, res) => {
  res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Ресурс не найден' });
});
app.use(errors());
app.use(errorsHandler);
mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT} port`);
});
