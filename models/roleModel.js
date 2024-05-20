const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    role_id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        index: true
    },
    role_name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: {
        type: Schema.Types.Mixed,
        default: {}
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
roleSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
