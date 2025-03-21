const { Team, teamValidate } = require("../../models/components/team")
const { deleteSingleOldImage, deleteManyOldImage } = require("../../utils/deleteOldImage")


exports.teamAllList = async (req,res) => {
    const team = await Team.find()
    res.status(200).send(team)
}

exports.teamAdd = async (req,res) => {
    const {error} = teamValidate(req.body)

    if (error) {
        res.status(400).send(error.message)
    } else {
        let team
        let result
        let fileObj = req.files;
        let filesObjLength = Object.keys(fileObj).length

        if (filesObjLength===0) {

            team = new Team(req.body)
            result = await team.save()
            res.status(201).json(result)
            
        } else {
            const team = new Team(req.body);
            const uploadFiles = [];
            req.files.images.map(async item => {
                uploadFiles.push(item.path)
            })
            team.image = uploadFiles;
            team.coverImage = req.files.coverImage[0].path;
            const result = await team.save();
            res.status(201).json(result);
        }
    }
}

exports.teamEdit = async(req,res) => {
    const { error } = teamValidate(req.body);

    if (error) {
        return res.status(400).send(error.message);
    }

    const paramsId = req.params.id;
    let team = await Team.findById(paramsId);

    if (!team) {
        return res.status(404).send("There is not such kind of data");
    }

    // control this line, if req.files undefined
    let fileObj = req.files || {}; 
    let filesObjLength = Object.keys(fileObj).length;

    if (filesObjLength === 0) {
        team = await Team.findByIdAndUpdate(paramsId, { ...req.body }, { new: true });
        await team.save();
        return res.status(200).json(team);
    }
    team = await Team.findByIdAndUpdate(paramsId, { ...req.body }, { new: true });

    if (team.coverImage) {
        deleteSingleOldImage(team.coverImage);
    }
    if (team.images) {
        deleteManyOldImage(team.images);
    }
    const uploadFiles = [];
    if (req.files.images) {
        req.files.images.forEach(item => {
            uploadFiles.push(item.path);
        });
    }

    team.images = uploadFiles;
    team.coverImage = req.files.coverImage?.[0]?.path || team.coverImage;

    const result = await team.save();
    res.status(201).send(result);
}

exports.teamDelete = async(req,res) => {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
        return res.status(404).json({ message: "There is not such kind of data" });
    }
    deleteSingleOldImage(team.coverImage);
    deleteManyOldImage(team.images);
    res.status(200).send(team);
}