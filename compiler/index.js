const express = require('express')
const app = express()
const generateFile = require('./generateFile')
const executeFile = require('./executeFile')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) =>{
    res.send("Hello World")
})

app.post("/run", async (req, res) => {
    const {language = 'C++' , code} = req.body;

    if (code == undefined) {
        return res.status(400).json({ success: false, error: "No code provided" });
    }

    try {
        const filePath = generateFile(language,code);
        const output = await executeFile(filePath, language);
        res.status(200).json({ success: true, output });
    } catch (error) {
        console.error('Error in /run:', error);
        res.status(500).json({
             success: false, 
             error: typeof error === "string" ? error : error.message || "Unknown error"
             });

    }
})


app.listen(8100, ()=>{
    console.log("Listening on port 8100");
})