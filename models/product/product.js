const Joi = require("joi")
const {default: mongoose, Schema} = require("mongoose")

const productSchema = Schema({
    name: String,
    price: Number,
    desc: String, 
    coverImg: String,
    images: [String],
    discount: Number,
    active: {
        type: Boolean,
        default: true
    },
    category: [{
        type: Schema.Types.ObjectId, ref: "Category"
    }],
    rating: Number

}, {timestamps: true})

const productValidate = (product) => {
    const schema = new Joi.object({
        name: Joi.string(),
        price: Joi.number(), 
        desc: Joi.string(), 
        coverImg: Joi.string(),
        images: Joi.array().items(Joi.string()),
        discount: Joi.number(), 
        active: Joi.boolean(), 
        categor: Joi.string(),
        rating: Joi.number().min(1).max(5)
    })
    return schema.validate(product)
}

const Product = mongoose.model("Product", productSchema)

module.exports = {Product, productValidate}