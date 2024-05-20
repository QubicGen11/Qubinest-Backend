const mongoose=require('mongoose')
const employeeSchema = new Schema({
    employee_id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        index: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hire_date: {
        type: Date,
        default: Date.now
    },
    position: {
        type: String,
        required: true
    },
    department_id: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    manager_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        default: null
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
const Employee = mongoose.model('Employee', employeeSchema);