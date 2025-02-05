const express = require("express")
const router = express.Router()
const { productAdd, productDelete } = require("../../controllers/product/product");
const upload = require("../../middlewares/uploadsFile");

router.post("/",upload.fields([{name:"coverImg", maxCount: 1}, {name:"images"}]), productAdd) //use multer for upload multiple photos  ------ look to uploadsFile.js

router.delete('/:id', productDelete);

module.exports = router
