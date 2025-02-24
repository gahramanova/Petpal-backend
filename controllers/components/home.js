const { Home, homecontentValidate } = require("../../models/components/home")
const { deleteSingleOldImage } = require("../../utils/deleteOldImage")

exports.homeAllList = async(req,res) => {
    const home = await Home.find()
    res.status(200).send(home)
}


exports.homeEdit =  async(req,res) => {
    const home = await Home.findById("67bc6ce4982ff85f0bf4b630");

    if(!home) {
        return res.status(404).send("There is not such kind of data")
    } else {
        if(req.files) {
            const home = await Home.findByIdAndUpdate(
                "67bc6ce4982ff85f0bf4b630", 
            {...req.body}, { new: true }
        );

        deleteSingleOldImage(home.homeRightImage)
        deleteSingleOldImage(home.titleImgFirst)
        deleteSingleOldImage(home.titleImgSecond)
        deleteSingleOldImage(home.imageSecond)
        deleteSingleOldImage(home.imageThird)
        deleteSingleOldImage(home.imageFourth)
        deleteSingleOldImage(home.imageFifth)

        home.homeRightImage = req.files.homeRightImage[0].path;
        home.titleImgFirst = req.files.titleImgFirst[0].path
        home.titleImgSecond = req.files.titleImgSecond[0].path
        home.imageSecond = req.files.imageSecond[0].path;
        home.imageThird = req.files.imageThird[0].path;
        home.imageFourth = req.files.imageFourth[0].path;
        home.imageFifth = req.files.imageFifth[0].path;


        await home.save()
        res.status(200).json(home)

        } else {
            const home = await Home.findByIdAndUpdate(
                "67bc6ce4982ff85f0bf4b630",
                { ...req.body }
            )
            await home.save();

            res.status(200).json(home);

        }
    }

}

