const express = require("express");
const { userAuth } = require("../../controllers/ubwo/user");
const router = express.Router();

router.post('/login', userAuth);

module.exports = router;
