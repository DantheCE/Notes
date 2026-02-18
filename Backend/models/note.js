const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL

console.log('connecting to database')

mongoose.connect(url, {family: 4})
.then(result => {
    console.log('connected to MongoDB')
}) 
.catch(error => {
    console.log('error connecting to MongoDB: ', error.message)
})

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

noteSchema.pre('update', function(next){
    this.setOptions({runValidators: true, context: 'query'})
    next();
})
noteSchema.pre('FindOneAndupdate', function(next){
    this.setOptions({runValidators: true, context: 'query'})
    next();
})
noteSchema.pre('FindByIdAndupdate', function(next){
    this.setOptions({runValidators: true, context: 'query'})
    next();
})
noteSchema.pre('updateOne', function(next){
    next();
})
noteSchema.pre('updateMany', function(next){
    this.setOptions({runValidators: true, context: 'query'})
    next();
})

module.exports = mongoose.model('Note', noteSchema)