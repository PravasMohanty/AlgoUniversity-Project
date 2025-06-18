const Question = require('../models/Qtruestion');


const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
        
    }
}

const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id)
        if(!question){
            return res.status(404).send("Question Not Found");
        }
        res.status(200).json(question);
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}

module.exports = {
    getAllQuestions,
    getQuestionById

}