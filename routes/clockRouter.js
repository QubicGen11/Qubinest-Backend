const employeeClockin=require('../controllers/clockController')
const express=require('express')
const router=express.Router()
router.post('/clockin',employeeClockin)
module.exports=router