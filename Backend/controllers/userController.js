const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('notes', { content: 1, important: 1 })
    response.json(users)
  } catch (error) {
    next(error)
  }
})

userRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    if (!username || !name || !password) {
      return response.status(400).json({ error: 'Fill form correctly, no missing fields' })
    }

    if (username.length < 3 || password.length < 3) {
      return response.status(400).json({ error: 'Credentials do not match requirements (length)' })
    }

    const user_check = await User.findOne({ username })
    if (user_check) {
      return response.status(400).json({ error: 'Username already exists!' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = userRouter