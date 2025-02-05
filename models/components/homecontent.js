const Joi = require("joi")
const {default: mongoose, Schema} = require("mongoose")
const homecontentSchema = Schema({
    titleFirst: String,
    imageFirst: String,
    descFirst: String,

    titleSecond: String,
    imageSecond: String,
    descSecond: String,

    titleThird: String,
    imageThird: String,
    descThird: String, 

    titleFourth: String,
    imageFourth: String,
    descFourth: String,

    titleFifth: String,
    imageFifth: String,
    descFifth: String

}, {timestamps: true})

const homecontentValidate = (content) => {
    const schema = new Joi.object({
        titleFirst: Joi.string(),
        imageFirst: Joi.string(),
        descFirst: Joi.string(),

        titleSecond: Joi.string(),
        imageSecond: Joi.string(),
        descSecond: Joi.string(),

        titleThird: Joi.string(),
        imageThird: Joi.string(),
        descThird: Joi.string(),

        titleFourth: Joi.string(),
        imageFourth: Joi.string(),
        descFourth: Joi.string(),

        titleFifth: Joi.string(),
        imageFifth: Joi.string(),
        descFifth: Joi.string()
    })
    return schema.validate(content)
}

const Content = mongoose.model("Content", homecontentSchema)

module.exports = {Content, homecontentValidate}