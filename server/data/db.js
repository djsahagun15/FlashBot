const path = require("path");
const fs = require("fs");

const db = require("better-sqlite3")(path.resolve(__dirname, "./Database.db"));

db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conversation_id INTEGER NOT NULL,
        content TEXT NOT NULL,

        FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
    );
`);


module.exports = db;