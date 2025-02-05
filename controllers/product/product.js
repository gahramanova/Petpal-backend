const {Product, productValidate} = require("../../models/product/product")
const { deleteSingleOldImage, deleteManyOldImage } = require("../../utils/deleteOldImage")


exports.productListAll = async(req, res) => {
    const product = await Product.find()
    res.status(200).send(product)
}

exports.productListById = async(req, res) => {
    const product = await Product.findById(req.params.id)
    res.status(200).send(product)
}

exports.productByPaginationList = async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1;

    const skip = (page-1)*limit;
    const totalProduct = await Product.countDocuments()
    const product = await Product.find().skip(skip).limit(limit)
    res.status(200).json({
        product,
        totalPage: Math.round(totalProduct/limit)
    })
}

exports.productAdd = async (req, res) => {
    const { error } = productValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        let product;
        let result;
        let fileObj = req.files;
        let filesObjLength = Object.keys(fileObj).length;
        if (filesObjLength === 0) {

            product = new Product(req.body);
            result = await product.save();
            res.status(201).json(result);

        }else{
            const product = new Product(req.body);
            const uploadFiles = [];
            req.files.images.map(async item => {
                uploadFiles.push(item.path)
            })
            product.images = uploadFiles;
            product.coverImg = req.files.coverImg[0].path;
            const result = await product.save();
            res.status(201).json(result);
        }
    }
}


exports.productDelete = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    deleteSingleOldImage(product.coverImg);
    deleteManyOldImage(product.images);
    res.status(200).send(product);
}