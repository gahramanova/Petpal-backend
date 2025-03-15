const express = require("express")
const router = express.Router()
const upload = require("../../middlewares/uploadsFile");
const { aboutAllList, aboutEdit, howWeCanHelpAll, aboutDelete, howWeCanHelpDelete, howWeCanHelpEdit } = require("../../controllers/components/about");


router.get("/", aboutAllList)
router.put("/:id", upload.fields([{name:"images", maxCount:1}]), aboutEdit)
router.delete("/:id", aboutDelete)

//=========================================================================================================

router.get("/howWeCanHelp", howWeCanHelpAll)
router.put("/howWeCanHelp/:id", upload.fields([{name:"images", maxCount:1}]), howWeCanHelpEdit)
// router.post("/howWeCanHelp", howWeCanHelpAdd);
router.delete("/howWeCanHelp/:id", howWeCanHelpDelete)




module.exports = router