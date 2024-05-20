const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeTrainingSchema = new Schema({
    employee_training_id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        index: true
    },
    employee_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    training_program_id: {
        type: Schema.Types.ObjectId,
        ref: 'TrainingProgram',
        required: true
    },
    completion_date: {
        type: Date,
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

employeeTrainingSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const EmployeeTraining = mongoose.model('EmployeeTraining', employeeTrainingSchema);

module.exports = EmployeeTraining;
