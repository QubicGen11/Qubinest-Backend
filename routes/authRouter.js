const express=require('express')
const {employeeLogin,employeeRegister}=require('../controllers/authController')
const router=express.Router()

router.post('/register',employeeRegister)
router.post('/login',employeeLogin)
module.exports=router