//requirements
require('dotenv').config()
const Note = require('./models/note')
const express = require('express')
const app = express()
const morgan = require('morgan')



//middleware
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))


//helper function
const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(
        ...notes.map(n => Number(n.id))
    ) : 0

    return String(maxId + 1)
}

//default root
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})


//getting already created nodes
app.get('/api/notes', (req, res) => {
    Note.find({}).then(notess => {
        res.json(notess)
    }).catch(error => {
        console.log('error fetching notes', error)
        res.status(500).json({ error: 'error fetching notes' })
    })
})

//geting a specific note
app.get( '/api/notes/:id', (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            res.json(note)
        })
        .catch(error => {
            console.error("Note not found")
            res.status(404).end()
        })
})

//deleting a specific note
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})


//cerating a new note
app.post('/api/notes', (req, res) => {
    const body = req.body

    if (!body.content){
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        id: generateId(),
    })

    note.save().then(savedNote => {
        res.json(savedNote)
    })
    .catch(error => {
        console.error("Note not saved")
    })
})


//error handling
const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
