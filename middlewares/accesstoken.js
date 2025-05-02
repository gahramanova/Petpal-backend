const accesstoken = async (req, res, next) => {
    try {
      const token = "f20e26bb783ea89ef58823b877337a2e";
      const incomingToken = req.headers["petpal-token"];
  
      if (!incomingToken) {
        return res.status(401).send("no-access");
      }
  
      if (incomingToken !== token) {
        return res.status(401).send("invalid token");
      }
  
      next();
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  };
  