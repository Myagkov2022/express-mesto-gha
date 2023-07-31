const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();
const validateURL = require('../middlewares/validateURL');
const {
  getUsers, getUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL, 'url validation'),
  }),
}), updateAvatar);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), getUser);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

module.exports = usersRouter;
