const jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send('You do not have authority')
    }

    try {
        const decodedToken = jwt.verify(token,"jwtPrivateKey");
        req.user = decodedToken;
        next();
    } catch (ex) {
        res.status("wrong token");
    }
}