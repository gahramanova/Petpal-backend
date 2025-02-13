const { Home, homecontentValidate } = require("../../models/components/home")

exports.homeAllList = async(req,res) => {
    const home = await Home.find()
    res.status(200).send(home)
}

exports.homeListById =async(req,res) => {
    const home = await Home.findById(req.params.id)
    res.status(200).send(home)
}

exports.homeEdit = async(req,res) => {
    

}