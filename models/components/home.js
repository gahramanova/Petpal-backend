const Joi = require("joi")
const {default: mongoose, Schema} = require("mongoose")

const homecontentSchema = Schema({
    titleFirst: String,
    imageFirst: String,
    descFirst: String,
    titleImgFirst: String,
    titleImgSecond: String,

    titleSecond: String,
    subTitleSecond: String,
    imageSecond: String,
    descrightSecond: String,
    generalDescription: String,

    titleThird: String,
    subTitleThird: String,
    imageThird: String,
    descThird: String, 
    heroOne:String,
    heroTwo:String,
    heroThree:String,
    heroFour:String,

    titleFourth: String,
    subTitleFourth: String,
    imageFourth: String,
    descFourth: String,

    titleFifth: String,
    imageFifth: String,
    descFifth: String

}, {timestamps: true})

const homecontentValidate = (home) => {
    const schema = new Joi.object({
        titleFirst: Joi.string(),
        imageFirst: Joi.string(),
        descFirst: Joi.string(),
        titleImgFirst: Joi.string(),
        titleImgSecond: Joi.string(),

        titleSecond: Joi.string(),
        subTitleSecond: Joi.string(),
        imageSecond: Joi.string(),
        descrightSecond: Joi.string(),
        generalDescription: Joi.string(),

        titleThird: Joi.string(),
        subTitleThird: Joi.string(),
        imageThird: Joi.string(),
        descThird: Joi.string(),
        heroOne: Joi.string(),
        heroTwo: Joi.string(),
        heroThree: Joi.string(),
        heroFour: Joi.string(),


        titleFourth: Joi.string(),
        subTitleFourth: Joi.string(),
        imageFourth: Joi.string(),
        descFourth: Joi.string(),

        titleFifth: Joi.string(),
        imageFifth: Joi.string(),
        descFifth: Joi.string()
    })
    return schema.validate(home)
}

const Home = mongoose.model("Home", homecontentSchema)

module.exports = {Home, homecontentValidate}