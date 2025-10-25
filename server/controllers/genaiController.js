const genaiService = require("../services/genaiService");


async function generateContent(req, res) {
    try {
        const { prompt } = req.body;
        
        const text = await genaiService.generateContent(prompt);

        res.send({ response: text });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to generate response" });
    }
}


module.exports = {
    generateContent
};