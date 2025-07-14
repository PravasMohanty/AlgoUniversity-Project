// Import axios for making HTTP requests to the compiler service
const axios = require('axios');
const dotenv = require('dotenv')

dotenv.config()

// Controller function to handle code compilation requests
const compileCode = async (req, res) => {
    // Extract code, language, and input from the request body
    const { code, language, input } = req.body;

    // Validate that code and language are provided
    if (!code || !language) {
        return res.status(400).json({ error: "Code and language are required" });
    }
    try {
        // Send a POST request to the compiler service API
        const response = await axios.post(`${process.env.COMPILER_URL}/run`, {
            code,
            language,
            input
        });
        // Extract and trim the output from the compiler service response
        const Output = response.data.output ? response.data.output.trim() : "";
        // Send the output back to the client as JSON
        return res.json({ output: Output });
    } catch (error) {
        // Log and handle any errors during the compilation process
        console.log(error);
        return res.status(500).json({ error: "Something went wrong during execution", details: error.message });
    }
}

// Export the controller function
module.exports = compileCode;

