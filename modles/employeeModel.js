const mongoose = require("mongoose");
const employeeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
    },
    role:{
        type:String,
    },
    hireDate:{
        type:Date
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})
 
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
