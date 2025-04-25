const accesstoken = async (req, res, next) => {
    try {
        const token = "f20e26bb783ea89ef58823b877337a2e"
        const incomingToken = req.headers["petpal-token"]

        if (!Object.keys(req.headers).includes("petpal-token")) {
            return res.status(401).send("no-access")  
        } 
        if (!token) {
            return res.status(401).send("no-access")
        }
        if(!incomingToken) {
            return res.status(401).send("no-access")
        }
        next();


    } catch (error) {
        console.log(error)
    }
}