const { About, HowWeCanHelp } = require("../../models/components/about")
const { deleteSingleOldImage } = require("../../utils/deleteOldImage")



exports.aboutAllList = async(req,res) => {
    const about = await About.find()
    res.status(200).send(about)
}


exports.aboutEdit = async (req,res) => {
    const about = await About.findById("67ceff78a7eeaab5a944f7be")

    if (!about) {
        return res.status(400).send("There is not such kind of data")
    } else {

        if (req.files) {
            const about = await About.findByIdAndUpdate("67ceff78a7eeaab5a944f7be", 

                {...req.body}, {new:true}
            );

            deleteSingleOldImage(about.images)

            about.images = req.files.images[0].path


            await about.save()
            res.status(200).json(about)

        }else {
            const about = await About.findByIdAndUpdate("67ceff78a7eeaab5a944f7be", 
                {...req.body}
            )
            await about.save()
            res.status(200).json(about)
        }
        
    }
}

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
    try {
        const helpData = [
            { title: "Test About 1", description: "This is a test description" },
        ];
        const createdData = await HowWeCanHelp.insertMany(helpData);
        res.status(201).send({ message: "Test data added successfully", data: createdData });
    } catch (error) {
        res.status(500).send({ error: "Error adding test data", details: error.message });
    }
};




exports.howWeCanHelpEdit = async(req,res) => {
    const help = await HowWeCanHelp.findById("67d3223f8af4bf330f69874a")


    if(!help) {
        return res.status(400).send("There is not such kind of data")

    } else {

        if(req.files) {
            const help = await HowWeCanHelp.findByIdAndUpdate("67d3223f8af4bf330f69874a",
            {...req.body}, {new:true}
            )

            deleteSingleOldImage(help.images)
            help.images = req.files.images[0].path

            await help.save()
            res.status(200).json(help)


        }else {
            const help = await HowWeCanHelp.findByIdAndUpdate("67d3223f8af4bf330f69874a", 
                {...req.body}
            )
            await help.save()
            res.status(200).json(help)
        }

    }
}


exports.howWeCanHelpDelete = async (req, res) => {
    const help = await HowWeCanHelp.findByIdAndDelete(req.params.id);
    if (!help) {
        return res.status(404).json({ message: "Product not found" });
    } 

}
