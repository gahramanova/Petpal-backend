const { GeneralInformation, generalInformationValidate } = require("../models/generalInfo");
const { deleteSingleOldImage } = require("../utils/deleteOldImage")

exports.generalInformationList = async (req, res) => {
    const generalInformation = await GeneralInformation.find();
    res.status(200).send(generalInformation);
}

exports.generalInformationSingleList = async (req, res) => {
    const generalInformation = await GeneralInformation.findById(req.params.id);
    res.status(200).send(generalInformation);
}

exports.generalInformationAdd = async (req, res) => {

    const { error } = generalInformationValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {

        let fileObj = req.files;
        let filesObjLength = Object.keys(fileObj).length;
        if (filesObjLength === 0) {

            const generalInformation = new GeneralInformation(req.body);
            const result = await generalInformation.save();
            res.status(201).send(result);

        } else {
            const generalInformation = new GeneralInformation(req.body);
            generalInformation.logoLight = req.files.logoLight[0].path;
            generalInformation.logoDark = req.files.logoDark[0].path;
            const result = await generalInformation.save();
            res.status(201).send(result);
        }

    }

}

exports.generalInformationEdit = async (req, res) => {
    const { error } = generalInformationValidate(req.body);
    const paramsId = req.params.id;
    if (error) {
        res.status(400).send(error.message);
    } else {
        let generalInformation;
        generalInformation = await GeneralInformation.findById(paramsId);
        if (!generalInformation) {
            return res.status(404).send("No GeneralInformation");
        } else {
            let fileObj = req.files;
            let filesObjLength = Object.keys(fileObj).length;
            if (filesObjLength === 0) {
                generalInformation = await GeneralInformation.findByIdAndUpdate(paramsId, {
                    ...req.body
                });
                await generalInformation.save();
                res.status(200).json(generalInformation);
            } else {
                generalInformation = await GeneralInformation.findByIdAndUpdate(paramsId, {
                    ...req.body
                });
                deleteSingleOldImage(generalInformation.logoLight);
                deleteSingleOldImage(generalInformation.logoDark);
                generalInformation.logoLight = req.files.logoLight[0].path;
                generalInformation.logoDark = req.files.logoDark[0].path;
                const result = await generalInformation.save();
                res.status(201).send(result);
            }
        }
    }
}

exports.generalInformationDelete = async (req, res) => {
    const generalInformation = await GeneralInformation.findByIdAndDelete(req.params.id);

    if(!generalInformation) {
        return res.status(404).json({ message: "Product not found" });
    }

    deleteSingleOldImage(generalInformation.logoLight);
    deleteSingleOldImage(generalInformation.logoDark);
    res.status(200).send(generalInformation);
}