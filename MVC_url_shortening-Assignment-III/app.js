const express = require("express");
const urlRouter = require("./routes/urlRoute");
const apiError = require("./utils/apiError");
const app = express();
const errorHandler = require("./controllers/errorController");
app.use(express.json());
app.use("/api/v1/url", urlRouter);
app.all("*", (req, res, next) => {
  next(
    new apiError(404, `${req.originalUrl} is not found, Please check again!`)
  );
});
app.use(errorHandler.errorMiddleware);
module.exports = app;
