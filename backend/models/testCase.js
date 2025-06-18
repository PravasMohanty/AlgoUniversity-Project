const mongoose = require('mongoose')
const Schema = mongoose.Schema

const testCaseSchema = new Schema({
  input: {
    type: String,
    required: true
  },
  expectedOutput: {
    type: String,
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question', // Reference to Question collection
    required: true
  },
  isVisible: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('TestCase', testCaseSchema)