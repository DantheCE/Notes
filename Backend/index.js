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
app.get( '/api/notes/:id', (req, res, next) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note){
                res.json(note)
            }
            else{
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

//deleting a specific note
app.delete('/api/notes/:id', (req, res, next) => {
    Note.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
            console.log('note deleted')
        })
        .catch(error => next(error))
})


//cerating a new note
app.post('/api/notes', (req, res, next) => {
    const body = req.body

    if (!body.content){
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        console.log('note saved')
        res.json(savedNote)
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
    console.log(req.body)
    const {content, important} = req.body

    Note.findById(req.params.id)
        .then(note => {
            if (!note){
                console.log(note, "nothing here")
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
//error handling
const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.message === 'CastError'){
        return res.status(400).send({error: 'malformatted id'})
    }
    else if(error.name === 'ValidationError'){
        return res.status(400).send({error: error.message})
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
