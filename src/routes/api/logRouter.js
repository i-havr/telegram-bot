const express = require("express");
const { logController } = require("../../controllers");
const { catchAsync } = require("../../helpers");

const logRouter = express.Router();

logRouter.post("/log", catchAsync(logController));

module.exports = logRouter;
