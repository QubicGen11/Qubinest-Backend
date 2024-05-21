const express=require('express')
const {clockIn,clockOut}=require('../controllers/clockController')
const router=express.Router()
router.post('/clockin',clockIn)
router.post('/clockout',clockOut)
module.exports=router
