const express = require("express")
const router = express.Router()
const upload = require("../../middlewares/uploadsFile");
const { homeAllList,  homeEdit } = require("../../controllers/components/home");


router.get("/", homeAllList)
router.put("/:id", upload.fields([
    {name:"homeRightImage", maxCount:1},
    {name:"titleImgFirst", maxCount:1},
    {name:"titleImgSecond", maxCount:1},
    {name:"imageSecond", maxCount:1},
    {name:"imageThird", maxCount:1},
    {name:"imageFourth", maxCount:1},
    {name:"imageFifth", maxCount:1}
]),
     homeEdit)


module.exports = router
