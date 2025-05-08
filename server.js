const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path");
const connectdb = require("./config/connectdb")
require('dotenv').config();

// start middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true // Frontend tətbiqinizin ünvanı
}));
app.use(express.json())
//start end


//client router start
const accesstoken = require("./middlewares/accesstoken");
const surfaceRouter = require("./routers/client/surface");
// app.use(accesstoken);
app.use("/", surfaceRouter)


//client router end 



//auth router start
const auth = require("./middlewares/auth");
const { singleUser, userAuth } = require("./controllers/ubwo/user");

app.use(auth);
app.use("/user/:id", singleUser);

//order start


//order end

//auth router end

//admin routes start
const isadmin = require("./middlewares/isadmin");
const adProductRouter = require("./routers/admin/product")
const adCategoryRoute = require('./routers/admin/category');
const adhomeRoute = require("./routers/admin/home")
const adaboutRoute = require("./routers/admin/about")
const adTeamRoute = require("./routers/admin/team")
const adUserRoute = require("./routers/admin/user")
const adLoginRoute = require("./routers/admin/auth")
const adGeneralInfo = require("./routers/admin/generalInfo")


//app.use(isadmin);
app.use("/ad/product", adProductRouter)
app.use('/ad/category', adCategoryRoute);
app.use("/ad/home", adhomeRoute)
app.use("/ad/about", adaboutRoute)
app.use("/ad/team", adTeamRoute)
app.use("/ad/user", adUserRoute)
app.use("/ad/login", adLoginRoute)
app.use("/ad/generalInfo", adGeneralInfo)



//admin router ends


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log("api is working")

connectdb()


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
