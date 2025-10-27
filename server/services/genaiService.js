const { GoogleGenAI } = require("@google/genai");
const messageController = require("../models/messageModel");

const GEMINI_API_KEY = process.env.API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });


async function generateContent(history, newPrompt) {
    const contents = history.map((message) => {
        const role = message.sender === "user" ? "user" : "model";

        return {
            role: role,
            parts: [{ text: message.content }]
        }
    });

    contents.push({
        role: "user",
        parts: [{ text: newPrompt }]
    });
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents
        });
        
        return response.text;
    } catch (err) {
        console.error(err);
        return "Failed to generate response.";
    }
}


module.exports = {
    generateContent
};