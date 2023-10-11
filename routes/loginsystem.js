

const express = require('express');
const router=express.Router();
const userSign=require('../controllers/loginsystem');
const authenticateWithToken=require('../middleware/userMiddleware')
const {roleBasedAuthentication}=require('../middleware/roleMiddleware')

router.post('/signup', userSign.signupUser)
router.post('/signin', userSign.loginUser)
router.get('/getdata', authenticateWithToken, roleBasedAuthentication(['HR']), userSign.getAllData);
router.put('/resetpwd', userSign.resetPassword)
router.post('/forgetpwd',userSign.forgotPassword)


module.exports=router