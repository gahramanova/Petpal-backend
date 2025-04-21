
const express = require('express');
const router = require("express").Router();
const { generalInfoAll, generalInfoEdit } = require('../../controllers/ubwo/generalinformation');

router.get('/',generalInfoAll);
router.put("/:id", generalInfoEdit);

module.exports = router;