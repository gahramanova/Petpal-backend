const express = require("express")
const { productListAll, productListById, productByPaginationList } = require("../../controllers/product/product")
const { categoryList, categoryListById } = require("../../controllers/product/category")
const { aboutAllList, howWeCanHelpAll } = require("../../controllers/components/about")
const { homeAllList } = require("../../controllers/components/home")
const { teamAllList } = require("../../controllers/components/team")
const { generalInformationList } = require("../../controllers/generalInfo")
const router = express.Router()


router.get("/product", productListAll)
router.get("/product/:id", productListById)
router.get("/productpag", productByPaginationList)

router.get('/category',categoryList);
router.get('/category/:id',categoryListById);

router.get("/about", aboutAllList)
router.get("/howWeCanHelp", howWeCanHelpAll)

router.get("/home", homeAllList)

router.get("/team", teamAllList)

router.get("/generalInfo", generalInformationList)




module.exports = router