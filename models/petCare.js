const Joi = require("joi")
const {default: mongoose, Schema} = require("mongoose")
const petCareShcema = Schema({
    title: String,
    image: String,
    desc: String,
    date: String,
    breed: String,
    color: String,
    gender: String,
    weight: String,
    puppyID: Number,
    dateofBirth: Number
}, {timestamps: true})

const petCareValidate = (petCare) => {
    const schema = new Joi.object({
        title: Joi.string(),
        image: Joi.string(),
        desc: Joi.string(),
        date: Joi.string(),
        breed: Joi.string(),
        color: Joi.string(),
        gender: Joi.string(),
        weight: Joi.string(),
        puppyID: Joi.number(),
        dateofBirth: Joi.number()
    })
    return schema.validate(petCare)
}

const PetCare = mongoose.model("PetCare", petCareShcema)

module.exports = {PetCare, petCareValidate}