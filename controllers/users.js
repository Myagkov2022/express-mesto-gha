const User = require('../models/user');

const createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании профиля.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

const getUsers = (req, res) => {
  User.find({}).then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка сервера' }));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => { res.status(200).send(user); })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Произошла ошибка сервера' });
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
};
