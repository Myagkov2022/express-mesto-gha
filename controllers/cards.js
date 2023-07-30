const http2 = require('http2');
const mongoose = require('mongoose');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(http2.constants.HTTP_STATUS_OK).send(cards))
    .catch(() => res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' }));
};

const createCard = (req, res) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => res.status(http2.constants.HTTP_STATUS_CREATED).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные добавлении карточки.' });
      }
      return res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
    });
};

const deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        return res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
      }


      if (card.owner !== req.user._id) {
        return res.status(http2.constants.HTTP_STATUS_FORBIDDEN).send({ message: 'Нельзя удалить чужую карточку' });
      }

      Card.findByIdAndRemove(req.params.id);
      return res.status(http2.constants.HTTP_STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Не корректный id ' });
      }
      return res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректный формат id.' });
      }
      return res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
      }
      return res.status(http2.constants.HTTP_STATUS_OK).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректный формат id.' });
      }
      return res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
