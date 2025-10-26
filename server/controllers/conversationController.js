const conversationModel = require("../models/conversationModel");
const messageModel = require("../models/messageModel");
const genaiService = require("../services/genaiService");


async function add(req, res) {
    try {
        const { conversationId, prompt } = req.body;

        let id = conversationId;
        let titlePromise = Promise.resolve(null);

        if (!id) {
            titlePromise = genaiService.generateContent(`Generate ONLY 1 short, descriptive title for this conversation: ${prompt}`);
            
            const newId = conversationModel.newConversation("New Conversation").lastInsertRowid;
            id = newId;
        }

        messageModel.addMessage(id, "user", prompt);

        const responsePromise = genaiService.generateContent(prompt);

        const [titleResult, responseResult] = await Promise.all([titlePromise, responsePromise]);

        messageModel.addMessage(id, "AI", responseResult);

        if (titleResult) {
            conversationModel.renameConversation(id, titleResult);
        }

        res.status(200).send({
            conversationId: id,
            response: responseResult
        });
    } catch (err) {
        console.error("Error adding conversation:", err);
        res.sendStatus(500);
    }
}


async function getAll(req, res) {
    try {
        const conversations = conversationModel.getConversations();

        res.send(conversations);
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

        res.send({ message: "Deleted successfully" });
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