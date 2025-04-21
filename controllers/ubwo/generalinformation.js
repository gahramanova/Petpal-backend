const { GeneralInformation } = require("../../models/generalinformation");

exports.generalInfoAll = async (req, res) => {
    const generalInfo = await GeneralInformation.find();
    res.status(200).send(generalInfo);
}

exports.generalInfoEdit = async (req, res) => {
    const generalInfo = await GeneralInformation.findByIdAndUpdate("680692d2e9583113645c4e9f", req.body);
    res.status(200).send(generalInfo);
}
