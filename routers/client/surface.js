const express = require("express")
const { productListAll, productListById, productByPaginationList } = require("../../controllers/product/product")
const { categoryList, categoryListById } = require("../../controllers/product/category")
const router = express.Router()


router.get("/product", productListAll)
router.get("/product/:id", productListById)
router.get("/productpag", productByPaginationList)

router.get('/category',categoryList);
router.get('/category/:id',categoryListById);


module.exports = router