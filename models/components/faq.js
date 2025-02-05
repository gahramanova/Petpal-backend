const Joi = require("joi")
const {default: mongoose, Schema} = require("mongoose")
const faqSchema = Schema({
    question: String,
    answer: String,
}, {timestamps: true})

const faqValidate = (faq) => {
    const schema = new Joi.object({
        question: Joi.string(),
        answer: Joi.string()
    })

    return schema.validate(faq)
}

const FAQ = mongoose.model("FAQ", faqSchema)

module.exports = {FAQ, faqValidate}