import { getAllQuestions, getQuestionById } from '../controllers/questionController';
const express = require('express')
const QuestRouter = express.Router();

QuestRouter.get("/ " , getAllQuestions)
QuestRouter.get("/:id" , getQuestionById)


export default QuestRouter;

//