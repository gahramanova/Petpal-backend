const Joi = require("joi");
const { default: mongoose, Schema } = require("mongoose");
const jwt = require("jsonwebtoken");


const userSchema = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
const userValidate = (user) => {
    const schema = new Joi.object({
        name: Joi.string().label("Name").required(),
        surname: Joi.string().label("Surname").required(),
        email: Joi.string().label("Email").min(8).max(50).required(),
        phone: Joi.string().label("Phone").min(8).max(13).required(),
        password: Joi.string().label("Password").min(8).max(50).required(),
        role: Joi.string().label("Role"),
        active: Joi.boolean().label("Active"),


    })
    return schema.validate(user);
};

const loginValidate = (user) => {
    const schema = new Joi.object({
        email: Joi.string().label("Email").min(8).max(50).required(),
        password: Joi.string().label("Password").min(8).max(50).required()

    })
    return schema.validate(user);
}


userSchema.methods.createAuthToken = function () {
    const decodedToken = jwt.sign({ name: this.name, surname: this.surname, role: this.role }, "jwtPrivateKey");
    return decodedToken;
}


const User = mongoose.model("User", userSchema)

module.exports = { User, userValidate, loginValidate }