const Joi = require("joi")
const {default: mongoose, Schema} = require("mongoose")
const generalInformationSchema = Schema({
    title: String,
    logo: String,
    favicon: String,
    desc: String,
    keyword: [String],
    phone: [Number],
    email: [Number],
    address: String,
    openingHours: String,
    mapUrl: String,
    instagramUrl: String,
    facebookUrl: String,
    linkedinUrl: String,
})

const generalInformationValidate = (generalInformation) => {
    const schema = new Joi.object({
        title: new Joi.string(),
        logo: new Joi.string(),
        favicon: new Joi.string(),
        desc: new Joi.string(),
        keyword: new Joi.array(),
        phone: new Joi.array(),
        email: new Joi.array(),
        address: new Joi.string(),
        openingHours: new Joi.string(),
        instagramUrl: new Joi.string(),
        facebookUrl: new Joi.string(),
        linkedinUrl: new Joi.string(),
    })

    return schema.validate(generalInformation)
}

const GeneralInformation = mongoose.model("GeneralInformation", generalInformationSchema)

module.exports = {GeneralInformation, generalInformationValidate}