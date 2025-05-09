const accesstoken = async (req, res, next) => {
    try {
      const token = "f20e26bb783ea89ef58823b877337a2e";
      const incomingToken = req.headers['petpal-access'];
  
      if (!Object.keys(req.headers).includes('petpal-access')) {
            return res.status(401).send("no access!");
        }

        if (!incomingToken) {
            return res.status(401).send("no access!");
        }

        if (incomingToken !== token) {
            return res.status(401).send("no access!");
        }
  
      next();
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  };
  