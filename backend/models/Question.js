    const mongoose = require('mongoose')
    const Schema = mongoose.Schema;

    const QuestionSchema = new Schema({
        question: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'],
            default: 'Easy'
        },
        tags: {
            type: [String],
            enum: ["Array", "Graph", "DP", "Greedy", "Math", "Binary Search" , "Prefix Sum" , "Stack" , "Queue","Linked List","Two-Pointer" , "Sliding Window" , "Bit Manipulation" , "Recursion" , "Backtracking" , "Trie", "Tree"],
            required: true
        }
    })

    module.exports = mongoose.model('Question', QuestionSchema)