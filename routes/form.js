const express = require('express');
const router=express.Router();

const userform=require('../controllers/form')
router.post("/createform", userform.CreateData);
router.get("/getAllFor", userform.getAllForm);
router.post("/multiData", userform.insertManyData);
router.delete('/formdelete/:id', userform.deleteFormById)
router.put('/formupdate/:id', userform.updateFormByID)


module.exports=router;