const Joi = require("joi")
const {default: mongoose, Schema} = require("mongoose")


const counterSchema = Schema({
    relatedNumber: Number,
    title: String
}, {timestamps: true})

const counterValidate = (counter) => {
    const schema = new Joi.object({
        relatedNumber: Joi.number(),
        title: Joi.string()
    })

    return schema.validate(counter)
}

const Counter = mongoose.model("Counter", counterSchema)

module.exports = {Counter, counterSchema}