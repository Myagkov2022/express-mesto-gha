const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка сервера' }));
};

const createCard = (req, res) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные добавлении карточки.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id).then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      return
    }
    res.status(200).send(card)
  });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные карточки.' });
      } else if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Некорректный формат id.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные карточки.' });
      } else if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Некорректный формат id.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
