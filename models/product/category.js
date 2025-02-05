const Joi = require("joi")
const {default: mongoose, Schema} = require("mongoose")
const categorySchema = Schema({
    title:String,

}, {timestamps: true});



const categoryValidate = (category) => {
    const schema = new Joi.object({
        title: Joi.string()
    })
    return schema.validate(category)
}

const Category = mongoose.model("Category", categorySchema)

module.exports = {Category, categoryValidate}