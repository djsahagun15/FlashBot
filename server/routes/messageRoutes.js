const express = require("express");
const { addMessage, getMessages } = require("../controllers/messageController");


const router = express.Router();

router.post("/new", addMessage);

router.all("/get/:conversationId", getMessages);


module.exports = router;