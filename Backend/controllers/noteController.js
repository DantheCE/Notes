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
    await NoteModel.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// POST - create a new note
noteRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body
    console.log(body)

    if (!body.user) {
      return res.status(400).json({ error: 'user missing' })
    }

    const user = await UserModel.findById(body.user)
    if (!user) {
      return res.status(400).json({ error: 'user not found' })
    }

    if (!body.content) {
      return res.status(400).json({ error: 'content missing' })
    }

    const note = new NoteModel({
      content: body.content,
      important: body.important || false,
      user: user._id
    })

    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
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