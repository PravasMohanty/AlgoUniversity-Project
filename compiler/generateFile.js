const fs = require('fs')
const path = require("path")
const {v4 : uuid} = require("uuid");

const dirCodes = path.join(__dirname,'codes')

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes , { recursive: true });
  }

const generateFile = (language, code) =>{


    const langMap = {
    'C++' : 'cpp',
    'Java' : 'java',
    'Python' : 'py'
    }

    const extension = langMap[language]

    if (!extension) {
        throw new Error("Unsupported language: " + language);
      }

    const JobId = uuid()
    const fileName = `${JobId}.${extension}`
    const filePath = path.join(dirCodes, fileName);

    try {
        fs.writeFileSync(filePath, code);
    console.log(JobId);
    return filePath
    } 
    catch (error) {
        console.log("Failed to write File",error);
        throw new Error("Code file generation failed"); 
    }
} 

module.exports = generateFile;