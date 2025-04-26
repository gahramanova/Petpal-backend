const express = require("express");
const { userList, userAdd, userDelete, singleUser, userEdit} = require("../../controllers/ubwo/user");
const router = express.Router();

router.get('/',userList);
router.get('/id',singleUser)
router.post('/',userAdd);
router.put('/:id',userEdit);
router.delete('/:id',userDelete);


module.exports = router;