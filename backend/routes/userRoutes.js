const express = require('express');
const userRouter = express.Router();
const { GetUserProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

userRouter.get( "/profile" ,verifyToken,GetUserProfile);

module.exports = userRouter;