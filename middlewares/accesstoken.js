const accesstoken = async (req, res, next) => {
    try {
      const token = "f20e26bb783ea89ef58823b877337a2e";
      const incomingToken = req.headers["petpal-token"];
  
      if (!incomingToken || incomingToken !== token) {
        return res.status(401).send("no-access");
      }
  
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send("server-error");
    }
  };
  