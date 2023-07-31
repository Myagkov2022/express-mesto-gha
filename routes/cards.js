const { celebrate, Joi } = require('celebrate');
const cardRouter = require('express').Router();
const validateURL = require('../middlewares/validateURL');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL, 'url validation'),
  }),
}), createCard);
cardRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), deleteCard);
cardRouter.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), likeCard);
cardRouter.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), dislikeCard);

module.exports = cardRouter;
