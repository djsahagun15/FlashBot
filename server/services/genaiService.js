require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const GEMINI_API_KEY = process.env.API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });


async function generateContent(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt
    });

    console.log(response.text);
}


module.exports = {
    generateContent
};