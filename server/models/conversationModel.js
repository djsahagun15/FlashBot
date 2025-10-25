const db = require("../data/db");

const newConversationStmt = db.prepare(`
    INSERT INTO conversations (title)
    VALUES (?)
`);


const getConversationsStmt = db.prepare(`
    SELECT *
    FROM conversations
`);


const renameConversationStmt = db.prepare(`
    UPDATE conversations
    SET title = ?
    WHERE id = ?
`);


const removeConversationStmt = db.prepare(`
    DELETE FROM conversations
    WHERE id = ?
`);


function newConversation(title) {
    return newConversationStmt.run(title);
}


function getConversations() {
    return getConversationsStmt.all() || [];
}


function renameConversation(id, newTitle) {
    return renameConversationStmt.run(newTitle, id);
}


function removeConversation(id) {
    return removeConversationStmt.run(id);
}


module.exports = {
    newConversation,
    getConversations,
    renameConversation,
    removeConversation
};