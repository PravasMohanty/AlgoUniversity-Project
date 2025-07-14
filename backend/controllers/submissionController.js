const Question = require('../models/Question');
const Submission = require('../models/Submission');
const TestCase = require('../models/TestCase');
const axios = require('axios');
const User = require('../models/User');
const dotenv = require('dotenv')

dotenv.config()

const submitCode = async (req, res) => {
    const { slug } = req.params;
    const { code, language } = req.body;

    // 🛑 Step 1: Basic Validation
    if (!code || !language) {
        return res.status(400).json({ error: "Code and language are required" });
    }

    try {
        // 🔍 Step 2: Get Question by Slug
        const question = await Question.findOne({ slug });
        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        // 📥 Step 3: Get Test Cases for the Question
        const testCases = await TestCase.find({ questionId: question._id });

        // ⚙️ Step 4: Evaluate all Test Cases
        let allPassed = true;
        let testCaseResults = [];

        for (const test of testCases) {
            const input = test.input;
            const expectedOutput = test.output.trim();

            const response = await axios.post(`${process.env.COMPILER_URL}/run`, {
                code,
                language,
                input
            });

            const actualOutput = response.data.output.trim();
            const passed = actualOutput === expectedOutput;

            testCaseResults.push({ input, expectedOutput, actualOutput, passed });

            if (!passed) allPassed = false;
        }

        // 🧾 Step 5: Save Submission
        const submission = await Submission.create({
            userId: req.user.id,
            questionId: question._id,
            code,
            language,
            result: allPassed ? "Accepted ✅" : "Wrong Answer ❌",
            testCaseResults,
            createdAt: new Date() // optional but useful
        });

        // 🧠 Step 6: Update User's Solved List
        if (allPassed) {
            // agar sab pass ho gaye
            const userId = req.user.id;

            await User.updateOne(
                {
                    _id: userId,
                    solved: { $ne: question._id }  // agar already solved nahi hai
                },
                {
                    $push: { solved: question._id },      // solved list mein daal do
                    $inc: { problemSolved: 1 }            // counter +1
                }
            );
        }

        // 🚀 Step 7: Return Final Verdict
        res.status(200).json({
            verdict: allPassed ? "Accepted ✅" : "Rejected ❌",
            submissionId: submission._id,
            testCaseResults
        });

    } catch (error) {
        console.error("Submission error:", error.message);
        res.status(500).json({ error: "Something went wrong during submission" });
    }
};

module.exports = { submitCode };
