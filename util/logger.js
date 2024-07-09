const fs = require("fs");
const path = require("path");

const logStream = fs.createWriteStream(path.join(__dirname, "logs.txt"), {
  flags: "a",
});

function logger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = `${new Date().toISOString()} - ${req.method} ${
      req.originalUrl
    } ${res.statusCode} ${duration}ms\n`;
    logStream.write(log);
  });
  next();
}

module.exports = logger;
