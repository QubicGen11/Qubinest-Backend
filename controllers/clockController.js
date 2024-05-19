const Employee=require('../models/Employee')

const employeeClockin=async(req,res)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(400).send('user is not authenticated')
        }
        const clockIn=Employee.clocking.push({clockin:new Date()})
        await clockin.save()
        const clockinCookie=res.cookie('clockin',clockIn)
        return res.status(200).send('clockin is succesful')
    } catch (error) {
        return res.status(500).send('internal error'+error.message)
    }
}
module.exports=employeeClockin