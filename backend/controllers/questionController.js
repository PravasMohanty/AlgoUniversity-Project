const TestCase = require('../models/TestCase');
const Question = require('../models/Question');



const createQuestion = async (req, res) => {
    try {
        // Only allow admins to create questions
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
        }
        const { question, difficulty, tags, testcases } = req.body;

        if (!question || !difficulty || !tags || !testcases) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newQuestion = new Question({
            question,
            difficulty,
            tags,
        });

        const savedQuestion = await newQuestion.save();

        // testcases is an array from req.body
        const testCases = testcases.map(tc => ({
            input: tc.input,
            output: tc.output,
            questionId: savedQuestion._id,
            isVisible: tc.isVisible,
        }));

        await TestCase.insertMany(testCases);

        res.status(201).json(savedQuestion);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).send("Question Not Found");
        }
        res.status(200).json(question);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteQuestion = async (req, res) => {
    try {
        if(!req.user || !req.user.isAdmin) {
            return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
        }

        const q_Id = req.params.id;
        const question = await Question.findById(q_Id);

        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        await Question.findByIdAndDelete(q_Id);
        await TestCase.deleteMany({ questionId: q_Id });

        res.status(200).json({ success: true, message: "Question deleted successfully" });
        

    } catch (error) {
        console.error("Delete Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

module.exports = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    deleteQuestion
}