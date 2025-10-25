const db = require("../data/db");

const addMessageStmt = db.prepare(`
    INSERT INTO messages (id, content)
    VALUES (?, ?)
`);


const getMessagesStmt = db.prepare(`
    SELECT content
    FROM messages
    WHERE conversation_id = ?
    ORDER BY id DESC
`);


function addMessage(id, content) {
    return addMessageStmt.run(id, content);
}


function getMessages(conversationId) {
    return getMessagesStmt.all(conversationId);
}


module.exports = {
    addMessage,
    getMessages
};