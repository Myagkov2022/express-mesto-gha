const User = require('../models/user');

const createUser = (req, res) => {
    User.create({...req.body})
        .then(user => res.status(201).send(user))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const getUsers = (req, res) => {
   User.find({}).then(users => res.status(200).send(users))
}

const getUser = (req, res) => {
    User.findById(req.params.id).then(user => res.status(200).send(user))
}

const updateProfile = (req, res) => {
    const {name, about} = req.body
    User.findByIdAndUpdate(req.user._id, {name, about}, {new: true}).then(user => res.status(200).send(user)).catch(err => console.log(err))
}

const updateAvatar = (req, res) => {
    const {avatar} = req.body
    User.findByIdAndUpdate(req.user._id, {avatar}, {new: true}).then(user => res.status(200).send(user)).catch(err=> console.log(err))
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateProfile,
    updateAvatar
}