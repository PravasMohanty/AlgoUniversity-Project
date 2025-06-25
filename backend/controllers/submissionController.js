const Question = require('../models/Question');
const TestCase = require('../models/TestCase');
const axios = require('axios');

const submitCode = async (req , res) => {
    const {slug} = req.params;
    const { code,language } = req.body;

    if (!code || !language) {
        return res.status(400).json({ error: "Code and language are required" });
    }

    try {
        const question = await Question.findOne({ slug })
        if(!question){
            return res.status(404).json({ error: "Question not found" });
        }

        const testCases = await TestCase.find({
            questionId: question._id
        })

        let allPassed = true;
        let testCaseResult = []

        for (const test of testCases) {
            const input = test.input;
            const expectedOutput = test.output.trim();

            const response = await axios.post("http://localhost:8100/run", 
                                            {
                                                code,
                                                language,
                                                input
                                            });
            const actualOutput = response.data.output.trim();
            const passed = actualOutput === expectedOutput;

            testCaseResults.push({ input, expectedOutput, actualOutput, passed });

            if (!passed) allPassed = false;
        }

        res.status(200).json({
            verdict: allPassed ? "Accepted ✅" : "Wrong Answer ❌",
            testCaseResults
        });



    } catch (error) {
        console.error("Submission error:", error.message);
        res.status(500).json({ error: "Something went wrong during submission" });
    }
};

module.exports = { submitCode };