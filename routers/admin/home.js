const express = require("express")
const router = express.Router()
const upload = require("../../middlewares/uploadsFile");
const { homeAllList, homeListById } = require("../../controllers/components/home");


router.get("/", homeAllList)
router.get("/:id", homeListById)


module.exports = router
