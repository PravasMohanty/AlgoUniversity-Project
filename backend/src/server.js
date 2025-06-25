const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const authRouter = require('../routes/authRouter');
const DBConnection = require('../database/db');
const userRouter = require('../routes/userRoutes');
const QuestRouter = require('../routes/QuestionRoutes');

dotenv.config()
const app = express()
DBConnection();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/auth",authRouter);
app.use("/user",userRouter);
app.use("/practice",QuestRouter)

app.listen(process.env.PORT , ()=>{
    console.log(`Listening on port ${process.env.PORT}`);
    
})
