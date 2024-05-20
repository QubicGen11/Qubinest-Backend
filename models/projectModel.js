const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    project_id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        index: true
    },
    project_name: {
        type: String,
        required: true,
        unique: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    manager_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
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
projectSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
