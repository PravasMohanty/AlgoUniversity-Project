const express = require('express')
const app = express()
const generateFile = require('./generateFile')

const { executeCpp, executePy, executeJava } = require('./executeFile')
const { generateInputFile } = require('./generateInputfile')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.post("/run", async (req, res) => {
    let { language = 'cpp', code, input = "" } = req.body;

    if (!code) {
        return res.status(400).json({ success: false, error: "No code provided" });
    }

    // Standardize language keys
    language = language.toLowerCase();
    if (!['cpp', 'java', 'py'].includes(language)) {
        return res.status(400).json({ success: false, error: "Unsupported language" });
    }

    try {
        const filePath = generateFile(language, code);
        const inputPath = generateInputFile(input);

        let output;
        if (language === 'cpp') {
            output = await executeCpp(filePath, inputPath);
        } else if (language === 'py') {
            output = await executePy(filePath, inputPath);
        } else if (language === 'java') {
            output = await executeJava(filePath, inputPath);
        }

        res.status(200).json({
            success: true,
            filePath,
            inputPath,
            output
        });

    } catch (error) {
        console.error('Error in /run:', error);
        res.status(500).json({
            success: false,
            error: error.error || error.message || "Unknown error"
        });
    }
})

app.listen(8100, () => {
    console.log("Listening on port 8100");
})