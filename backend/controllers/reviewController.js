const { GoogleGenAI } = require('@google/genai');
const dotenv = require('dotenv');

dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });



const generateAiResponse = async (code, language) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Analyze the code below and give a crisp review of the code , considering possible errors , suggestions , corrections ans scope for improvement. ${code
            } . It is in ${language} language. Keep it to the point and upto a maximum limit of 200 words`
    });
    console.log(response.text);
    return response.text;
}

module.exports = generateAiResponse;