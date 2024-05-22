const mongoose=require('mongoose')
const Employee=require('../models/employeeModel')
const Schema=mongoose.Schema
const attendanceSchema = new Schema({
    attendance_id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        index: true
    },
    username:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        required: true
    },
    check_in_time: {
        type: Date,
        required: true
    },
    check_out_time: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['Approved',"Pending"],
        default:'Pending',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
const Attendace=mongoose.model('Attendance',attendanceSchema)
module.exports=Attendace