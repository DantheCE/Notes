require('dotenv').config()
const mongoose = require('mongoose')
const Note = require('../models/note')
const User = require('../models/user')
const bcrypt = require('bcrypt')

// npm run dev sets NODE_ENV=test, so the server uses TEST_MONGODB_URL — match that here
const MONGODB_URL = process.env.TEST_MONGODB_URL

mongoose.connect(MONGODB_URL).then(async () => {
  // 1. Wipe both collections
  await Note.deleteMany({})
  await User.deleteMany({})
  console.log('✅ Collections wiped.')

  // 2. Create fresh user with a name
  const passwordHash = await bcrypt.hash('secret123', 10)
  const user = new User({ username: 'daniel', name: 'Daniel', passwordHash })
  const savedUser = await user.save()
  console.log('USER_ID=' + savedUser._id.toString())

  // 3. Create two notes linked to that user
  const note1 = new Note({ content: 'MongoDB makes persisting data easy and flexible', important: false, user: savedUser._id })
  const savedNote1 = await note1.save()
  savedUser.notes = savedUser.notes.concat(savedNote1._id)

  const note2 = new Note({ content: 'Note two for populate testing', important: true, user: savedUser._id })
  const savedNote2 = await note2.save()
  savedUser.notes = savedUser.notes.concat(savedNote2._id)

  await savedUser.save()
  console.log('✅ Two notes created and linked to user.')

  mongoose.connection.close()
})
