const express = require('express');
const { createQuestion, getAllQuestions, getQuestionById } = require('../controllers/questionController');
const verifyToken = require('../middleware/authMiddleware');
const QuestRouter = express.Router();

QuestRouter.get("/", getAllQuestions);
QuestRouter.get("/:id", getQuestionById);
QuestRouter.post("/admin/create", verifyToken, createQuestion);

module.exports = QuestRouter;

