

const express = require('express');
const router=express.Router();


const userSign=require('../controllers/loginsystem')
router.post('/signup', userSign.signupUser)
router.post('/signin', userSign.loginUser)
router.get('/alldata', userSign.getAllData);
router.put('/resetpwd', userSign.resetPassword)
router.post('/forgetpwd',userSign.forgotPassword)


module.exports=router