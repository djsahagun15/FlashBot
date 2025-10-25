const express = require("express");
const messageRoutes = require("./messageRoutes");
const conversationRoutes = require("./conversationRoutes");
const genaiRoutes = require("./genaiRoutes");


const router = express.Router();

router.use("/api/message", messageRoutes);
router.use("/api/conversation", conversationRoutes);
router.use("/api/genai", genaiRoutes);

module.exports = router;