const express = require("express")
const { productListAll, productListById, productByPaginationList } = require("../../controllers/product/product")
const { categoryList, categoryListById } = require("../../controllers/product/category")
const { aboutAllList, howWeCanHelpAll } = require("../../controllers/components/about")
const { generalInformationList, generalInformationSingleList } = require("../../controllers/ubwo/generalinformation")
const { homeAllList } = require("../../controllers/components/home")
const { teamAllList } = require("../../controllers/components/team")
const router = express.Router()


router.get("/product", productListAll)
router.get("/product/:id", productListById)
router.get("/productpag", productByPaginationList)

router.get('/category',categoryList);
router.get('/category/:id',categoryListById);

router.get("/", aboutAllList)
router.get("/howWeCanHelp", howWeCanHelpAll)

router.get('/', generalInformationList);
router.get("/:id", generalInformationSingleList);

router.get("/", homeAllList)

router.get("/", teamAllList)






module.exports = router