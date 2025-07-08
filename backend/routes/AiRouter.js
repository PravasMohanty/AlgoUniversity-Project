const express = require('express');
const generateAiResponse = require('../controllers/reviewController');
const AiRouter = express.Router();



const MakeCall = async (req, res) => {
    const { code, language } = req.body;

    if (code === undefined || language === undefined || code.trim() === '') {
        return res.status(400).json({
            success: false,
            error: "Empty Code"
        })
    }

    try {
        const response = await generateAiResponse(code, language);
        return res.status(200).json({
            success: true,
            review: response
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message || "Something went wrong"
        })
    }
}

AiRouter.post("/", MakeCall)

module.exports = AiRouter;