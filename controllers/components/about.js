const { About, HowWeCanHelp, howWeCanHelpValidate } = require("../../models/components/about")
const { deleteSingleOldImage } = require("../../utils/deleteOldImage")



exports.aboutAllList = async(req,res) => {
    const about = await About.find()
    res.status(200).send(about)
}


exports.aboutEdit = async (req, res) => {
    const about = await About.findById(req.params.id);

    if (!about) {
        return res.status(400).send("There is not such kind of data");
    }

    if (req.files && req.files.images && req.files.images.length > 0) {
        // Köhnə şəkilləri sil
        if (about.images && about.images.length > 0) {
            about.images.forEach(image => deleteSingleOldImage(image));
        }

        const imagePaths = req.files.images.map(file => file.path);

        const updated = await About.findByIdAndUpdate(
            req.params.id,
            { ...req.body, images: imagePaths },
            { new: true }
        );

        return res.status(200).json(updated);
    } else {
        const updated = await About.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );

        return res.status(200).json(updated);
    }
};


exports.aboutDelete = async (req, res) => {
    const about = await About.findByIdAndDelete(req.params.id);
    if (!about) {
        return res.status(404).json({ message: "Product not found" });
    }

}

// ================================================================================================

exports.howWeCanHelpAll = async(req,res) => {
    const help = await HowWeCanHelp.find()
    res.status(200).send(help)
}

exports.howWeCanHelpAdd = async (req, res) => {
    const { error } = howWeCanHelpValidate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }

    try {
        let help;
        let result;
        let fileObj = req.files;
        let filesObjLength = Object.keys(fileObj).length;

        // Fayl olmadan məhsul əlavə edilməsi
        if (filesObjLength === 0) {
            help = new HowWeCanHelp(req.body);
            result = await help.save();
            return res.status(201).json(result);
        }

        // Fayllarla məhsul əlavə edilməsi
        help = new HowWeCanHelp(req.body);
        const uploadFiles = [];

        // Asinxron fayl yükləmə əməliyyatı
        if (req.files.images) {
            const imagePaths = await Promise.all(
                req.files.images.map(async item => item.path)
            );
            uploadFiles.push(...imagePaths);
        }

        // Yüklənmiş şəkil və örtük şəkilini əlavə edin
        if (req.files.coverImg) {
            help.coverImg = req.files.coverImg[0].path;
        }
        help.images = uploadFiles;

        // Məhsulu verilənlər bazasına əlavə et
        result = await help.save();
        return res.status(201).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error while adding product");
    }
};




exports.howWeCanHelpDelete = async (req, res) => {
    const help = await HowWeCanHelp.findByIdAndDelete(req.params.id);
    if (!help) {
        return res.status(404).json({ message: "Product not found" });
    } 

}
