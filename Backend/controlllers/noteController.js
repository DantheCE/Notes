const noteRouter = require('express').Router()
const NoteModel = require('../models/note')

// GET all notes
noteRouter.get('/', async (req, res) => {
  const notes = await NoteModel.find({})
  res.json(notes)
})

// GET a specific note
noteRouter.get('/:id', (req, res, next) => {
  NoteModel.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

// DELETE a specific note
noteRouter.delete('/:id', (req, res, next) => {
  NoteModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
      console.log('note deleted')
    })
    .catch(error => next(error))
})

// POST - create a new note
noteRouter.post('/', (req, res, next) => {
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

  note.save().then(savedNote => {
    console.log('note saved')
    res.status(201).json(savedNote)
  })
    .catch(error => next(error))
})

// PUT - update a specific note
noteRouter.put('/:id', (req, res, next) => {
  console.log(req.body)
  const { content, important } = req.body

  NoteModel.findById(req.params.id)
    .then(note => {
      if (!note) {
        console.log(note, 'nothing here')
        return res.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        res.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

module.exports = noteRouter