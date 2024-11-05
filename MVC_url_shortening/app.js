const express = require("express");
const urlRouter = require("./routes/urlRoute");
const app = express();
app.use(express.json());
app.use("/api/v1/url", urlRouter);
module.exports = app;
