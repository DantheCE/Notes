require('dotenv').config()
const mongoose = require('mongoose')
const Note = require('../models/note')
const User = require('../models/user')

const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL).then(async () => {
    await Note.deleteMany({})
    await User.deleteMany({})
    console.log('Notes and Users collections wiped.')
    mongoose.connection.close()
})
