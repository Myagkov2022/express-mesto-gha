const usersRouter = require('express').Router()
const {getUsers, getUser, createUser, updateProfile, updateAvatar} = require('../controllers/users')

usersRouter.post("/", createUser)
usersRouter.get("/", getUsers)
usersRouter.get("/:id", getUser)
usersRouter.patch('/me', updateProfile )
usersRouter.patch('/me/avatar', updateAvatar )

module.exports = usersRouter