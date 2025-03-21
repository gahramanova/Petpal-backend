const express = require("express")
const { teamAllList, teamAdd, teamEdit, teamDelete } = require("../../controllers/components/team")
const upload = require("../../middlewares/uploadsFile")
const router = express.Router()

router.get("/", teamAllList)
router.post("/", upload.fields([{name:"coverImage", maxCount: 1}, {name:"images"}]), teamAdd) //use multer for upload multiple photos  ------ look to uploadsFile.js

router.put('/:id',upload.fields([{name:"coverImage",maxCount:1},{name:"images"}]), teamEdit);
router.delete("/:id", teamDelete)


module.exports = router