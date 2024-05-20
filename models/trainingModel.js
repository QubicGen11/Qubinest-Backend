const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainingProgramSchema = new Schema({
    training_program_id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        index: true
    },
    program_name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
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

// Middleware to update the updated_at field before saving
trainingProgramSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const TrainingProgram = mongoose.model('TrainingProgram', trainingProgramSchema);

module.exports = TrainingProgram;
