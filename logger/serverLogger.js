const { createLogger, format, transports } = require('winston');
const { timestamp, printf, combine, colorize } = format;

const logFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const serverLogger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new transports.File({ filename: 'logs/server.log' }),
    new transports.Console({ format: combine(colorize(), logFormat) })
  ]
});

module.exports = serverLogger;
