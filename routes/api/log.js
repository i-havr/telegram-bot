const express = require("express");
const { logController } = require("../../controllers");
const { cntrlWrap } = require("../../helpers");

const logRouter = express.Router();

logRouter.post("/log", cntrlWrap(logController));

module.exports = logRouter;
