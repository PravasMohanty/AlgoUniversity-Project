const express = require('express');
const compileCode = require('../controllers/compileController');
const CompileRouter = express.Router()


CompileRouter.post("/compile", compileCode);

module.exports = CompileRouter;