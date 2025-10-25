const express = require("express");
const { add, getAll, rename, remove } = require("../controllers/conversationController");


const router = express.Router();

router.post("/new", add);

router.all("/get-all", getAll);

router.put("/rename", rename);

router.delete("/delete", remove);


module.exports = router;