const Joi = require("joi")
const {default: mongoose, Schema} = require("mongoose")
const partnersShecma = Schema({
    coverImg: String
})

const partnersValidate = (partners) => {
    const schema = new Joi.object({
        coverImg: Joi.string()
    })

    return schema.validate(partners)
}

const Partners = mongoose.model("Patners", partnersShecma)

module.exports = {Partners, partnersValidate}