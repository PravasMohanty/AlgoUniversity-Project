const express = require('express');
const userRouter = express.Router();
const { GetUserProfile, getUserCount } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

userRouter.get("/profile", verifyToken, GetUserProfile);
userRouter.get("/count", getUserCount);

module.exports = userRouter;