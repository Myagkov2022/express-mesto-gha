const Card = require('../models/card')

const getCards = (req, res) => {
    Card.find({})
        .then(cards => res.status(200).send(cards))
        .catch(_err => res.status(500).send({ message: 'Произошла ошибка сервера' }))
}

const createCard = (req, res) => {

    Card.create({...req.body, owner: req.user._id})
        .then(card => res.status(201).send(card))
        .catch(err => {
            if (err.name === "ValidationError") {
                res.status(400).send({ message: 'Переданы некорректные данные добавлении карточки.'});
            } else {
                res.status(500).send({ message: 'Произошла ошибка сервера'});
            }
        })

}

const deleteCard = (req, res) => {
    Card.deleteOne({_id: req.params.id}).then(_del => res.status(200).send({"message":"Пост удалён"}))
}

const likeCard = (req, res) => {
    Card.findByIdAndUpdate(req.params.id, {$addToSet: {likes: req.user._id}}, {new: true})
        .then(update => res.status(200).send(update))
}

const dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(req.params.id, {$pull: {likes: req.user._id}},{new: true})
        .then(update => res.status(200).send(update))
}

module.exports = {
    getCards,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard
}