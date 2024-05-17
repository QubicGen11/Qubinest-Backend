const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique:true
    },
    mobile: {
        type: String
    },
    role: {
        type: String
    },
    hireDate: {
        type: Date
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
    },
    isClockedIn: {
        type: Boolean,
        default: false
    },
    lastClockInTime: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
