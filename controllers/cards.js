const http2 = require('http2');
const mongoose = require('mongoose');
const Card = require('../models/card');
const { ForbiddenError, NotFoundError, ValidationError } = require('../errors/index');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(http2.constants.HTTP_STATUS_OK).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => res.status(http2.constants.HTTP_STATUS_CREATED).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные добавлении карточки.'));
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }

      if (card.owner !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }

      Card.findByIdAndRemove(req.params.id);
      return res.status(http2.constants.HTTP_STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Не корректный id '));
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Некорректный формат id.'));
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      return res.status(http2.constants.HTTP_STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Некорректный формат id.'));
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
