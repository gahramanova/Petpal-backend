const Joi = require("joi")
const {default: mongoose, Schema} = require("mongoose")
const blogSchema = Schema({
    title: String,
    desc: String,
    author: String,
    publishDate: String,
    coverImage: String,
    images: String
})


const blogValidate = (blog) => {
    const schema = new Joi.object({
        title: Joi.string(),
        desc: Joi.string(),
        author: Joi.string(),
        publishDate: Joi.string(),
        coverImage: Joi.string(),
        images: Joi.array().items(Joi.string())
    })

    return schema.validate(blog)
}

const Blog = mongoose.model("Blog", blogSchema)

module.exports = {Blog, blogValidate}