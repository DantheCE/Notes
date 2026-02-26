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

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

// Ensure validators run on update operations
userSchema.pre('update', function (next) {
  this.setOptions({ runValidators: true, context: 'query' })
  next()
})
userSchema.pre('findOneAndUpdate', function (next) {
  this.setOptions({ runValidators: true, context: 'query' })
  next()
})
userSchema.pre('findByIdAndUpdate', function (next) {
  this.setOptions({ runValidators: true, context: 'query' })
  next()
})
userSchema.pre('updateOne', function (next) {
  this.setOptions({ runValidators: true, context: 'query' })
  next()
})
userSchema.pre('updateMany', function (next) {
  this.setOptions({ runValidators: true, context: 'query' })
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User