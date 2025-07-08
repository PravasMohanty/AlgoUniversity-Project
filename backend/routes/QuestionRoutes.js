const express = require('express');
const {
  createQuestion,
  getAllQuestions,
  deleteQuestion,
  getQuestionBySlug,
  getQuestionById
  // submitCode (future submission controller)
} = require('../controllers/questionController');

const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/adminMiddleware');
const { submitCode } = require('../controllers/submissionController');

const QuestRouter = express.Router();


//  =================== PUBLIC ROUTES ===================

// Get all questions (for list view)
QuestRouter.get("/", getAllQuestions);

// Get single question by slug (practice view)
QuestRouter.get("/:slug", getQuestionBySlug);

QuestRouter.get("/:Id", getQuestionById);

// Future: Submit code for a question
QuestRouter.post("/:slug/submission", verifyToken, submitCode);


//  =================== ADMIN ROUTES ===================

// Create a new question (admin only)
QuestRouter.post("/admin/create", verifyToken, verifyAdmin, createQuestion);

// Delete a question by ID (admin only)
QuestRouter.delete("/admin/delete/:id", verifyToken, verifyAdmin, deleteQuestion);

module.exports = QuestRouter;
