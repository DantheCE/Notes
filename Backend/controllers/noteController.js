const jwt = require('jsonwebtoken')
const noteRouter = require('express').Router()
const NoteModel = require('../models/note')
const UserModel = require('../models/user')

// GET all notes
noteRouter.get('/', async (req, res) => {
  const notes = await NoteModel.find({}).populate('user', { username: 1, name: 1 })
  res.json(notes)
})

// GET a specific note
noteRouter.get('/:id', async (req, res, next) => {
  try {
    const note = await NoteModel.findById(req.params.id).populate('user', { username: 1, name: 1 })
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

// DELETE a specific note
noteRouter.delete('/:id', async (req, res, next) => {
  try {
    await NoteModel.findByIdAndDelete(req.params.id) //how do we know the id of what we search for is in req.params.id if we never set this ahead of time?
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// POST - create a new note
noteRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body

    if (!body.content) {
      return res.status(400).json({ error: 'content missing' })
    }

    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET) //what exactly is returned from this payload
    // and how do we access it, where in the codebase do we affect what is returned here

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const user = await UserModel.findById(decodedToken.id)
    if (!user) {
      return res.status(400).json({ error: 'user not found' })
    }


    const note = new NoteModel({
      content: body.content,
      important: body.important || false,
      user: user._id
    })

    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id) //why do we use ._id here instead of just .id
    await user.save()

    res.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

// PUT - update a specific note
noteRouter.put('/:id', async (req, res, next) => {
  const { content, important } = req.body

  try {
    const note = await NoteModel.findById(req.params.id)
    if (!note) {
      return res.status(404).end()
    }

    note.content = content
    note.important = important

    const updatedNote = await note.save()
    res.status(200).json(updatedNote)
  } catch (error) {
    next(error)
  }
})

module.exports = noteRouter