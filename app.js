const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { logRouret } = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/log", logRouret);

module.exports = app;
