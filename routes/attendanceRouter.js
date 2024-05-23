const attendanceController=require('../controllers/attendanceController')

const express=require('express')
const router=express.Router()

router.get('/attendance',attendanceController)
module.exports=router