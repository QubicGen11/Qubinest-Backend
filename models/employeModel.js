const mongoose=require('mongoose')
const clockingSchema=new mongoose.Schema({
    clockIn:{
        type:Date,
        default:Date.now()
    },
    clockOut:{
        type:Date,
        default:Date.now()
    }
})

const employeSchema=new mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        
    },
    profileImg:{
        type:String,
        
    },
    department:{
        type:String
    },
    jobTitle:{
        type:String
    },
    clocking:[clockingSchema]
})

const Employee=mongoose.model('Employee',employeSchema)
module.exports=Employee