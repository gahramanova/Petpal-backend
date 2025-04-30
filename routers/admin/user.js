const express = require("express");
const { userList, userAdd, userDelete, singleUser, userEdit, userAuth} = require("../../controllers/ubwo/user");
const router = express.Router();

router.get('/',userList);
router.get('/:id',singleUser)
router.post('/',userAdd);
router.put('/:id',userEdit);
router.delete('/:id',userDelete);


// Login route:

module.exports = router;