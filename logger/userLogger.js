const { createLogger, format, transports } = require('winston');
const { timestamp, printf, combine } = format;

const auditFormat = printf(({ timestamp, message }) => {
  return `${timestamp} [AUDIT]: ${message}`;
});

const auditLogger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    auditFormat
  ),
  transports: [
    new transports.File({ filename: 'logs/audit.log' })
  ]
});

module.exports = auditLogger;
