const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TestCaseSchema = new Schema({
  input: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question', // Reference to Question collection
    required: true
  },
  isVisible: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('TestCase', TestCaseSchema)