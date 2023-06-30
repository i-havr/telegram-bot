const express = require("express");
const logRouter = express.Router();

const {
  testController,
  autoSubscribe,
  startCommenting,
} = require("../../controllers");
const { catchAsync } = require("../../helpers");

// logRouter.post("/log", catchAsync(testController));
logRouter.post("/message", catchAsync(testController));

module.exports = logRouter;
