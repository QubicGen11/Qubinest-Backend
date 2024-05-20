const mongoose=require('mongoose')
const Employee=require('../models/employeeModel')
const attendanceSchema = new Schema({
    attendance_id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        index: true
    },
    employee_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
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
        enum: ['Present', 'Absent', 'Leave'],
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