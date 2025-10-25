require("dotenv").config({ path: "./services/.env" });

const path = require("path");
const fs = require("fs");

const express = require("express");
const cors = require("cors");

const routes = require("./routes/routes");

const db = require("./data/db");


const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);


const PORT = 8008;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});