const winston = require("winston");

const urlLogs = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "./logs/urlapi.log",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.File({
      filename: "./logs/urlapiError.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

module.exports = urlLogs;
