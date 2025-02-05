const Joi = require("joi")
const {default: mongoose, Schema} = require("mongoose")
const aboutHelpSchema = Schema({
    title: String,
    image: String,
    desc: String
})

const aboutHelpValidate = (aboutHelp) => {
    const schema = new Joi.object({
        title: Joi.string(),
        image: Joi.string(),
        desc: Joi.string()
    })

    return schema.validate(aboutHelp)
}

const AboutHelp = mongoose.model("AboutHelp", aboutHelpSchema)

module.exports = {AboutHelp, aboutHelpValidate}