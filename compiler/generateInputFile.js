// Import required modules
const fs = require('fs')
const path = require("path")
const { v4: uuid } = require("uuid");

// Directory where input files will be stored
const dirInput = path.join(__dirname, 'input')

// Create the directory if it doesn't exist
if (!fs.existsSync(dirInput)) {
    fs.mkdirSync(dirInput, { recursive: true });
}

// Function to generate an input file with the provided input data
const generateInputFile = (input) => {
    // Ensure input is a string
    const inputString = input || '';

    // Generate a unique job ID and input file name
    const JobId = uuid()
    const IpName = `${JobId}.txt`
    const IpPath = path.join(dirInput, IpName)

    // Write the input data to the file
    fs.writeFileSync(IpPath, inputString)
    return IpPath
}

// Export the generateInputFile function
module.exports = generateInputFile