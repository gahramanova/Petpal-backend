const Joi = require("joi")
const {default: mongoose, Schema} = require("mongoose")


const aboutSchema =  Schema({
    images: String, 
    title: String,
    desc: String
    
}, {timestamps: true})

const aboutValidate = (about) => {
    const schema = new Joi.object({
        images: Joi.array().items(Joi.string()),
        title: Joi.string(),
        desc: Joi.string()
    })
    return schema.validate(about)
}

const About = mongoose.model("About", aboutSchema)

module.exports= {About, aboutValidate}