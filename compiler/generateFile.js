// Import required modules
const fs = require('fs')
const path = require("path")
const { v4: uuid } = require("uuid");

// Directory where code files will be stored
const dirCodes = path.join(__dirname, 'codes')

// Create the directory if it doesn't exist
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

// Function to generate a code file for the given language and code
const generateFile = (language, code) => {

  // Map supported language keys to file extensions
  const langMap = {
    'cpp': 'cpp',
    'java': 'java',
    'py': 'py'
  }

  // Get the file extension for the given language
  const extension = langMap[language]

  // Throw an error if the language is not supported
  if (!extension) {
    throw new Error("Unsupported language: " + language);
  }

  // Generate a unique job ID and file name
  const JobId = uuid()
  const fileName = `${JobId}.${extension}`
  const filePath = path.join(dirCodes, fileName);

  try {
    // Write the code to the file
    fs.writeFileSync(filePath, code);
    console.log(JobId);
    return filePath
  }
  catch (error) {
    // Log and throw an error if file writing fails
    console.log("Failed to write File", error);
    throw new Error("Code file generation failed");
  }
}

// Export the generateFile function
module.exports = generateFile;