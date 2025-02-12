const { Product, productValidate } = require("../../models/product/product")
const { deleteSingleOldImage, deleteManyOldImage } = require("../../utils/deleteOldImage")


exports.productListAll = async (req, res) => {
    const product = await Product.find().populate("category")
    res.status(200).send(product)
}

exports.productListById = async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.status(200).send(product)
}

exports.productByPaginationList = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1;

    const skip = (page - 1) * limit;
    const totalProduct = await Product.countDocuments()
    const product = await Product.find().skip(skip).limit(limit)
    res.status(200).json({
        product,
        totalPage: Math.round(totalProduct / limit)
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

        } else {
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


exports.productEdit = async (req, res) => {
    const { error } = productValidate(req.body);

    if (error) {
        return res.status(400).send(error.message);
    }

    const paramsId = req.params.id;
    let product = await Product.findById(paramsId);

    if (!product) {
        return res.status(404).send("No Product");
    }

    // control this line, if req.files undefined
    let fileObj = req.files || {}; 
    let filesObjLength = Object.keys(fileObj).length;

    if (filesObjLength === 0) {
        product = await Product.findByIdAndUpdate(paramsId, { ...req.body }, { new: true });
        await product.save();
        return res.status(200).json(product);
    }
    product = await Product.findByIdAndUpdate(paramsId, { ...req.body }, { new: true });

    if (product.coverImg) {
        deleteSingleOldImage(product.coverImg);
    }
    if (product.images) {
        deleteManyOldImage(product.images);
    }

    const uploadFiles = [];
    if (req.files.images) {
        req.files.images.forEach(item => {
            uploadFiles.push(item.path);
        });
    }

    product.images = uploadFiles;
    product.coverImg = req.files.coverImg?.[0]?.path || product.coverImg;

    const result = await product.save();
    res.status(201).send(result);
};

exports.productDelete = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    deleteSingleOldImage(product.coverImg);
    deleteManyOldImage(product.images);
    res.status(200).send(product);
}