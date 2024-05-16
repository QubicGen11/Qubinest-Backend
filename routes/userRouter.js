const express=require('express')
const {registerUser,loginUser}=require('../controllers/loginController')
const router=express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
module.exports=router