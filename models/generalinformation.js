const Joi = require("joi")
const {default: mongoose, Schema} = require("mongoose")
const generalInformationSchema = Schema({
    title: String,
    logoLight: String,
    logoDark: String,
    desc: String,
    keyword: [String],
    phone: [Number],
    email: [String],
    address: String,
    instagramUrl: String,
    facebookUrl: String,
    twitterUrl: String,
})

const generalInformationValidate = (generalInformation) => {
    const schema = new Joi.object({
        title: new Joi.string(),
        logoLight: new Joi.string(),
        logoDark: new Joi.string(),
        desc: new Joi.string(),
        keyword: new Joi.string(),
        phone: new Joi.string(),
        email: new Joi.string(),
        address: new Joi.string(),
        instagramUrl: new Joi.string(),
        facebookUrl: new Joi.string(),
        twitterUrl: new Joi.string(),
    })

    return schema.validate(generalInformation)
}

const GeneralInformation = mongoose.model("GeneralInformation", generalInformationSchema)

module.exports = {GeneralInformation, generalInformationValidate}