const express = require('express')
const cors = require('cors')
const app = express()
const generateFile = require('./generateFile')
const { executeCpp } = require('./executeCpp');
const { executePy } = require('./executePy');
const generateInputFile = require('./generateInputFile')

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.post("/run", async (req, res) => {
    const { language = 'cpp', code, input = '' } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        // console.log("Received request:", { language, code: code.substring(0, 100) + "...", input });
        const filePath = await generateFile(language, code);
        // console.log("Generated file:", filePath);
        const inputPath = await generateInputFile(input);
        // console.log("Generated input file:", inputPath);
        let output;


        if (language === 'py') {
            output = await executePy(filePath, inputPath);
        }
        else {
            output = await executeCpp(filePath, inputPath);
        }

        // console.log("Execution output:", output);
        res.json({ output });
    } catch (error) {
        console.error("Execution error:", error);
        const errorMessage = error.message || error.error || error.stderr || "Unknown error";
        res.status(500).json({ error: "Error in execution: " + errorMessage });
    }
});

app.listen(8100, () => {
    console.log("Listening on port 8100");
})