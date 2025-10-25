const messageModel = require("../models/messageModel");


async function addMessage(req, res) {
    try {
        const { conversationId, content } = req.body;
        
        messageModel.addMessage(conversationId, content);

        res.sendStatus(200);
    } catch (err) {
        console.error("Error adding message:", err);
        res.sendStatus(500);
    }
}


async function getMessages(req, res) {
    try {
        const { conversationId } = req.params;

        const messages = messageModel.getMessages(conversationId);
        
        res.send(messages);
    } catch (err) {
        console.error("Error retrieving messages:", err);
        res.sendStatus(500);
    }
}


module.exports = {
    addMessage,
    getMessages
};