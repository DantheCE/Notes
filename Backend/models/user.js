const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3 // at least 3 characters long
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
})

// virtual field to hold the plain-text password temporarily
userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
  })
  .get(function () {
    return this._password
  })

// password validation runs when the document is saved
userSchema.path('passwordHash').validate(function (value) {
  // only perform checks if a plain password was provided
  if (this._password) {
    if (this._password.length < 3) {
      this.invalidate('password', 'Password must be at least 3 characters long')
      return false
    }
  }
  return true
}, null)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User