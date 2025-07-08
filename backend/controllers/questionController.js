const TestCase = require('../models/TestCase');
const Question = require('../models/Question');
const slugify = require('../utils/slugify');

// ✅ Admin-only: Create a new question with its testcases
const createQuestion = async (req, res) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
    }

    const { titletag, description, difficulty, tags, testcases } = req.body;

    if (!titletag || !description || !difficulty || !tags || !testcases) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const slug = slugify(titletag);

    const existing = await Question.findOne({ slug });
    if (existing) {
      return res.status(409).json({ message: "Question with similar title already exists" });
    }

    const newQuestion = new Question({
      titletag,
      description,
      difficulty,
      tags,
      slug,
    });

    const savedQuestion = await newQuestion.save();

    // 📌 Map incoming testcases to DB format
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
};

// ✅ Get all questions (for listing)
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Admin-only: Delete a question and its testcases
const deleteQuestion = async (req, res) => {
  try {
    if (!req.user || !req.user.isAdmin) {
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
};

// ✅ Get a single question by slug (for practice page)
const getQuestionBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const question = await Question.findOne({ slug });

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // 🎯 Only return visible (sample) testcases
    const sampleTestCases = await TestCase.find({
      questionId: question._id,
      isVisible: true
    });

    res.status(200).json({
      question,
      sampleTestCases
    });

  } catch (err) {
    console.error('Error fetching question by slug:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getQuestionById = async (req, res) => {
  const { Id } = req.params;

  try {
    const question = await Question.findOne({ Id });

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // 🎯 Only return visible (sample) testcases
    const sampleTestCases = await TestCase.find({
      questionId: question._id,
      isVisible: true
    });

    res.status(200).json({
      question,
      sampleTestCases
    });

  } catch (err) {
    console.error('Error fetching question by slug:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllQuestions,
  createQuestion,
  deleteQuestion,
  getQuestionBySlug,
  getQuestionById
};
