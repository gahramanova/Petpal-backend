const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path");
const connectdb = require("./config/connectdb")
require('dotenv').config();

// start middleware
app.use(cors())
app.use(cors({
    origin: "http://localhost:5173", // Frontend tətbiqinizin ünvanı
  }));
app.use(express.json())
//start end


//client router start
const surfaceRouter = require("./routers/client/surface");
app.use("/", surfaceRouter)
//client router end 


//admin routes start

const adProductRouter = require("./routers/admin/product")
const adCategoryRoute = require('./routers/admin/category');
const adhomeRoute = require("./routers/admin/home")
const adaboutRoute = require("./routers/admin/about")
const adTeamRoute = require("./routers/admin/team")


app.use("/ad/product", adProductRouter)
app.use('/ad/category',adCategoryRoute);
app.use("/ad/home", adhomeRoute)
app.use("/ad/about", adaboutRoute)
app.use("/ad/team", adTeamRoute)

//admin router ends


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


connectdb()
app.listen(process.env.PORT, ()=> {
    console.log(`${process.env.PORT} port is running`);
})