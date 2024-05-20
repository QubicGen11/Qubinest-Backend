const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeProjectSchema = new Schema({
    employee_project_id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        index: true
    },
    employee_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    project_id: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    role: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
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

// Middleware to update the updated_at field before saving
employeeProjectSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const EmployeeProject = mongoose.model('EmployeeProject', employeeProjectSchema);

module.exports = EmployeeProject;
