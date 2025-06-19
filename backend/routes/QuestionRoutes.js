const express = require('express');
const { createQuestion, getAllQuestions, getQuestionById } = require('../controllers/questionController');
const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/adminMiddleware');
const QuestRouter = express.Router();

QuestRouter.get("/", getAllQuestions);
QuestRouter.get("/:id", getQuestionById);
QuestRouter.post("/admin/create", verifyToken ,verifyAdmin, createQuestion);
QuestRouter.delete("/admin/delete/:id", verifyToken ,verifyAdmin, deleteQuestion )


module.exports = QuestRouter;

