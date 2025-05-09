const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const connectdb = require("./config/connectdb");
require('dotenv').config();

// start middleware
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true // Cookies ilə əlaqə qurulması üçün
}));
app.use(express.json());
//start end

// Client Routes (Public Routes - Token tələb etmir)
const surfaceRouter = require("./routers/client/surface");
app.use("/", surfaceRouter);  // Public routes (Home, About, Products)

// Admin Routes (Token tələb edir)
const isadmin = require("./middlewares/isadmin");
const auth = require("./middlewares/auth");
const adProductRouter = require("./routers/admin/product");
const adCategoryRoute = require("./routers/admin/category");
const adhomeRoute = require("./routers/admin/home")
const adaboutRoute = require("./routers/admin/about")
const adTeamRoute = require("./routers/admin/team")
const adGeneralInfo = require("./routers/admin/generalInfo")
const adUserRoute = require("./routers/admin/user")
const adLoginRoute = require("./routers/admin/auth")



app.use("/ad/product", isadmin, adProductRouter);  // Admin protected
app.use("/ad/category", isadmin, adCategoryRoute);  // Admin protected
app.use("/ad/home", adhomeRoute)
app.use("/ad/about", adaboutRoute)
app.use("/ad/team", adTeamRoute)
app.use("/ad/generalInfo", adGeneralInfo)
app.use("/ad/user", adUserRoute)
app.use("/ad/login", adLoginRoute)

// Protected Routes (User authentication required)
const { singleUser, userAuth } = require("./controllers/ubwo/user");
app.use("/user/:id", auth, singleUser);  // Authenticated routes
app.use("/user/auth", auth, userAuth);  // Authenticated routes

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log("API is working");

connectdb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
