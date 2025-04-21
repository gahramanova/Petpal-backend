const express = require("express")
const router = express.Router()
const upload = require("../../middlewares/uploadsFile");
const { aboutAllList, aboutEdit, howWeCanHelpAll, aboutDelete, howWeCanHelpDelete, howWeCanHelpEdit, howWeCanHelpAdd } = require("../../controllers/components/about");


router.get("/", aboutAllList)
router.put("/:id", upload.fields([{name:"images", maxCount:2}]), aboutEdit)
router.delete("/:id", aboutDelete)

//=========================================================================================================

router.get("/howWeCanHelp", howWeCanHelpAll)
router.post("/howWeCanHelp", upload.fields([{name:"images", maxCount:1}]), howWeCanHelpAdd )
router.delete("/howWeCanHelp/:id", howWeCanHelpDelete)




module.exports = router