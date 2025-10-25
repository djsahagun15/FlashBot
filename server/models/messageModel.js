const db = require("../data/db");

const addMessageStmt = db.prepare(`
    INSERT INTO messages (conversation_id, sender, content)
    VALUES (?, ?, ?)
`);


const getMessagesStmt = db.prepare(`
    SELECT sender, content
    FROM messages
    WHERE conversation_id = ?
    ORDER BY id ASC
`);


function addMessage(conversationId, sender, content) {
    return addMessageStmt.run(conversationId, sender, content);
}


function getMessages(conversationId) {
    return getMessagesStmt.all(conversationId) || [];
}


module.exports = {
    addMessage,
    getMessages
};