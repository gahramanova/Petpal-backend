const mongoose = require("mongoose")

// const authdb = {
//     username: "nrmnqhrmn24",
//     password: "petpal",
// }
 const conncectdb = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSW}@${process.env.DB_CLUSTER}.l5902.mongodb.net/?retryWrites=true&w=majority&appName=petpal-cluster`)
        console.log("Mongodb connection is successfully")
    } catch (error) {
        console.log(error)
    }
}
module.exports = conncectdb