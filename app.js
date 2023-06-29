const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { logRouter, usersRouter } = require("./src/routes");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/log", logRouter);
app.use("/users", usersRouter);
// app.post("/log", logRouter);

app.all("*", (_, res) => {
  res.status(404).json({
    message: "Not Found!",
  });
});

app.use((err, _, res, __) => {
  const { status, message } = err;

  res.status(status || 500).json({ message });
});

module.exports = app;
