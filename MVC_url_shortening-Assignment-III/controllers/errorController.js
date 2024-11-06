exports.errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode;
  err.status = err.status || "err";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
