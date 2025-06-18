const express = require('express');
const { Login, Register } = require('../controllers/authController');
const authRouter = express.Router();

authRouter.post("/register" , Register)
authRouter.post("/login" , Login)

module.exports = authRouter;
