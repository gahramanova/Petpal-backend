
const express = require('express');
const router = require("express").Router();
const upload = require("../../middlewares/uploadsFile");

const { generalInformationList, generalInformationEdit, generalInformationAdd, generalInformationDelete, generalInformationSingleList } = require('../../controllers/ubwo/generalinformation');

router.get('/', generalInformationList);
router.get("/:id", generalInformationSingleList);
router.post('/', upload.fields([{ name: "logoLight", maxCount: 1 }, { name: "logoDark", maxCount: 1 }]), generalInformationAdd);
router.put("/:id", upload.fields([{ name: "logoLight", maxCount: 1 }, { name: "logoDark", maxCount: 1 }]), generalInformationEdit);
router.delete("/:id", generalInformationDelete);


module.exports = router;