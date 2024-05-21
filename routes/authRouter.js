const express=require('express')
const {userRegister,userLogin,logout}=require('../controllers/authController')
const router=express.Router()

router.post('/register',userRegister )

router.post('/login',userLogin)
router.post('/logout',logout)
module.exports=router