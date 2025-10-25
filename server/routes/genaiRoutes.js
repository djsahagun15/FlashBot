const express = require("express");
const { generateContent } = require("../controllers/genaiController");


const router = express.Router();

router.post("/generate", generateContent);


module.exports = router;