const express=require('express')
const registerUser = require('../controllers/loginController')
const router=express.Router()

router.post('/register',registerUser)
module.exports=router