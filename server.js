const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const connectdb = require("./config/connectdb");
require("dotenv").config();
const { serverLogger, auditLogger } = require("./logger"); 
const xss = require("xss-clean");

const allowedOrigins = [
  "http://localhost:5173",
  "https://petpal-kappa.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));
app.use(express.json());     // 1. JSON parse
app.use(xss());              // 2. XSS Protection (Clean all inputs)


// Request log middleware
app.use((req, res, next) => {
  serverLogger.info(`${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  next();
});

// Routers
const surfaceRouter = require("./routers/client/surface");
app.use("/", surfaceRouter);

// Admin routers
const adUserRoute = require("./routers/admin/user");
const adLoginRoute = require("./routers/admin/auth");
app.use("/ad/user", adUserRoute);
app.use("/ad/login", adLoginRoute);

// ... digər routerlər ...

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handler
app.use((err, req, res, next) => {
  serverLogger.error(`Xəta: ${err.message} - ${req.method} ${req.url}`);
  res.status(500).send("Serverdə xəta baş verdi");
});

// DB və server start
connectdb();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  serverLogger.info(`Server is running on port ${PORT}`);
});
