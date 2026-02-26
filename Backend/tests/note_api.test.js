const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Note = require('../models/note')

const api = supertest(app)


beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialNotes)
})

describe('GET endpoint', () => {

  test('all notes are returned and are in json format' , async () => {
    const response = await api.get('/api/notes')
      .expect('Content-Type', /application\/json/)
      .expect(200)

    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })
  test('a specific note is within the returned notes' , async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    console.log(contents)
    assert(contents.includes('HTML is easy'))
  })
  test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultNote.body, noteToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.get(`/api/notes/${validNonexistingId}`).expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/notes/${invalidId}`).expect(400)
  })
})

describe('POST endpoint', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

    const contents = notesAtEnd.map(n => n.content)
    assert(contents.includes('async/await simplifies making async calls'))
  })

  test('note with invalid data is not added and returns 400', async () => {
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const notesAtEnd = await helper.notesInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
  })
})

describe('DELETE endpoint', () => {
  test('a note can be deleted and returns 204', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helper.notesInDb()
    const ids = notesAtEnd.map(n => n.id)
    assert(!ids.includes(noteToDelete.id))

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
  })

})

describe('PUT endpoint', () => {
  test('a note can be updated', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToUpdate = notesAtStart[0]

    const updatedNote = { ...noteToUpdate, important: true }

    await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .send(updatedNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const notesAfterOper = await helper.notesInDb()
    const noteToCheck = notesAfterOper[0]

    assert.strictEqual(noteToCheck.important, updatedNote.important)
  }
  )
})

after(async () => {
  await mongoose.connection.close()
})