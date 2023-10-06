const express = require('express');
const router=express.Router();

const user=require('../controllers/user');
router.get("/getAllData", user.getAllData);
router.post("/createuser", user.createData);
router.post("/getDataByid/:id", user.getById);
router.get('/getuser', user.getSingleDataWithQuery)
router.get('/userdelete/:id', user.deleteById)
router.put('/userupdate/:id', user.updateById)

module.exports=router;