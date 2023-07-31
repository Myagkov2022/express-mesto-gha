const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const validateURL = require('../middlewares/validateURL');
const { NotFoundError } = require('../errors');

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL, 'url validation'),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});
module.exports = router;
