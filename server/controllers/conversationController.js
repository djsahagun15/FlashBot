const conversationModel = require("../models/conversationModel");
const messageModel = require("../models/messageModel");
const genaiService = require("../services/genaiService");


async function add(req, res) {
    try {
        const { conversationId, prompt } = req.body;

        let id = conversationId;

        if (!id) {
            const newId = conversationModel.newConversation("New Conversation").lastInsertRowid;
            id = newId;
        }

        messageModel.addMessage(id, "user", prompt);

        const aiResponse = await genaiService.generateContent(prompt);

        messageModel.addMessage(id, "AI", aiResponse);

        res.status(200).send({
            conversationId: id,
            response: aiResponse
        });
    } catch (err) {
        console.error("Error adding conversation:", err);
        res.sendStatus(500);
    }
}


async function getAll(req, res) {
    try {
        const conversations = conversationModel.getConversations();

        res.send({ conversations });
    } catch (err) {
        console.error("Error retrieving conversations:", err);
        res.sendStatus(500);
    }
}


async function rename(req, res) {
    try {
        const { id, title } = req.body;

        conversationModel.renameConversation(id, title);

        res.send({ message: "Renamed successfully" });
    } catch (err) {
        console.error("Error renaming conversation:", err);
        res.status(500).send({ message: "Failed to rename conversation" });
    }
}


async function remove(req, res) {
    try {
        const { id } = req.body;

        conversationModel.removeConversation(id);
    } catch (err) {
        console.error("Error deleting conversation:", err);
        res.status(500).send({ message: "Failed to delete conversation" });
    }
}


module.exports = {
    add,
    getAll,
    rename,
    remove
};