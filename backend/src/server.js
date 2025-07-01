const express = require('express')
const dotenv = require('dotenv')

// Load environment variables immediately
dotenv.config()

const cors = require('cors');
const authRouter = require('../routes/authRouter');
const DBConnection = require('../database/db');
const userRouter = require('../routes/userRoutes');
const QuestRouter = require('../routes/QuestionRoutes');
const CompileRouter = require('../routes/CompileRouter');


const app = express()
DBConnection();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/practice", QuestRouter)
app.use("/compile", CompileRouter)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);

})
