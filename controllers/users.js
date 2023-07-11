const http2 = require('node:http2');
const mongoose = require('mongoose');
const User = require('../models/user');

const createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => res.status(http2.constants.HTTP_STATUS_CREATED).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании профиля.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

const getUsers = (req, res) => {
  User.find({}).then((users) => res.status(http2.constants.HTTP_STATUS_OK).send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка сервера' }));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.status(http2.constants.HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Некорректный формат id.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.status(http2.constants.HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.status(http2.constants.HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка сервера' });
    });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
};
