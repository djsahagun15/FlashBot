const conversationModel = require("../models/conversationModel");


async function add(req, res) {
    try {
        const { title } = req.body;

        conversationModel.newConversation(title);

        res.sendStatus(200);
    } catch (err) {
        console.error("Error adding conversation:", err);
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
    rename,
    remove
};