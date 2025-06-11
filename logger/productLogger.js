// productLogger.js

const fs = require("fs");
const path = require("path");

// LOGS qovluğu varsa istifadə et, yoxdursa yarat
const logDirectory = path.join(__dirname, "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const productLogPath = path.join(logDirectory, "product.log");

const productLogger = async ({ req, action, details }) => {
  const timestamp = new Date().toISOString();
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const user = req.user?.email || "Anonymous";

  const logEntry = `[${timestamp}] IP: ${ip} | User: ${user} | Action: ${action} | Details: ${JSON.stringify(
    details
  )}\n`;

  fs.appendFile(productLogPath, logEntry, (err) => {
    if (err) console.error("Failed to write product log:", err);
  });
};

module.exports = productLogger;
