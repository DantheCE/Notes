const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logRouter = require('express').Router()

logRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = User.findOne({ username })

  const passwordCorrect = await user === null
    ? false
    : bcrypt.compare(password, user.passwordHash)

  if (!(passwordCorrect && user)){
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const user_tokenize = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(user_tokenize, process.env.SECRET, { expiresIn: 60 * 60 })

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = logRouter