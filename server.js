const express = require("express")
const app = express()
const cors = require("cors")
const connectdb = require("./config/connectdb")
require('dotenv').config();

// start middleware
app.use(cors())
app.use(express.json())
//start end


//client router start
const surfaceRouter = require("./routers/client/surface");
app.use("/", surfaceRouter)
//client router end 


//admin routes start

const adProductRouter = require("./routers/admin/product")
const adCategoryRoute = require('./routers/admin/category');
app.use("/ad/product", adProductRouter)
app.use('/ad/category',adCategoryRoute);

//admin router ends



connectdb()
app.listen(process.env.PORT, ()=> {
    console.log(`${process.env.PORT} port is running`);
})