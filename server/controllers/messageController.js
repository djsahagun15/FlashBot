const messageModel = require("../models/messageModel");


async function addMessage(req, res) {
    try {
        const { id, content } = req.body;
        
        messageModel.addMessage(id, content);

        res.sendStatus(200);
    } catch (err) {
        console.error("Error adding message:", err);
        res.sendStatus(500);
    }
}


async function getMessages(req, res) {
    try {
        const { id } = req.body;

        messageModel.getMessages(id);
        
        res.sendStatus(200);
    } catch (err) {
        console.error("Error retrieving messages:", err);
        res.sendStatus(500);
    }
}


module.exports = {
    addMessage,
    getMessages
};