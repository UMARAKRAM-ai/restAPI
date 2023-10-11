const express = require('express');
const router=express.Router();

const user=require('../controllers/user');

const {roleBasedAuthentication}=require('../middleware/roleMiddleware')

router.post("/createuser", user.createData);
router.get("/getAllData", user.getAllData);
router.post("/getDataByid/:id", user.getById);
router.get('/getuser', user.getSingleDataWithQuery)
router.get('/userdelete/:id',roleBasedAuthentication(['admin']), user.deleteById)
router.put('/userupdate/:id', user.updateById)

module.exports=router;