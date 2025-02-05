const Joi = require("joi")
const {default: mongoose, Schema} = require("mongoose")
const teamSchema = Schema({
    fullname: String,
    jobposition: String,
    coverImage: String,
    experience: String,
    experienceDesc: String,
    instagramUrl: String,
    facebookUrl: String,
    whatsappUrl: String,
    

    
}, {timestamps: true})

const teamValidate = (team) => {
    const schema = new Joi.object({
        fullname: Joi.string(),
        jobposition: Joi.string(),
        coverImage: Joi.string(),
        experience: Joi.string(),
        experienceDesc: Joi.string(),
        instagramUrl: Joi.string(),
        facebookUrl: Joi.string(),
        whatsappUrl: Joi.string(),
    })

    return schema.validate(team)
}

const Team = mongoose.model("Team", teamSchema)

module.exports = {Team, teamValidate}