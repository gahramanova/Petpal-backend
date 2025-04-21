const mongoose = require("mongoose")

// const authdb = {
//     username: "nrmnqhrmn24",
//     password: "petpal",
// }
 const conncectdb = async() => {
    try {
        await mongoose.connect(`mongodb+srv://nrmnqhrmn24:petpal@petpal-cluster.l5902.mongodb.net/?retryWrites=true&w=majority&appName=petpal-cluster`)
        console.log("Mongodb connection is successfully")
    } catch (error) {
        console.log(error)
    }
}
module.exports = conncectdb