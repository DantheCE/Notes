const noteRouter = require('express').Router()
const NoteModel = require('../models/note')

// GET all notes
noteRouter.get('/', async (req, res) => {
  const notes = await NoteModel.find({})
  res.json(notes)
})

// GET a specific note
noteRouter.get('/:id', async (req, res, next) => {
  try {
    const note = await NoteModel.findById(req.params.id)
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
noteRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = new NoteModel({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  res.status(201).json(savedNote)
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