const Joi = require("joi")
const {default: mongoose, Schema} = require("mongoose")
const userSchema = Schema({
    nameId: String,
    name: String,
    surname: String,
    phone: Number,
    email: String,
    password: String,
    role: {
        default: "user",
        enum: ["admin", "moderator", "user"]
    },
    active: {
        type: Boolean,
        default: true
    }

}, {timestamps: true})


const userValidate = (user) => {
    const schema = new Joi.object({
        nameId: new Joi.string(),
        name: new Joi.string(),
        surname: new Joi.string(),
        phone: new Joi.number().max(13),
        email: new Joi.string().min(8).max(30).required(),
        password: new Joi.string().min(8).max(18).required(),
        role: new Joi.string(),
    })

    return schema.validate(user)
}

const User = mongoose.model("User", userSchema)

module.exports = {User, userValidate}