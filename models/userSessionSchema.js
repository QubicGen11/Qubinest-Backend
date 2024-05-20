const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
    session_id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        index: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    login_time: {
        type: Date,
        required: true
    },
    logout_time: {
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
userSessionSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const UserSession = mongoose.model('UserSession', userSessionSchema);

module.exports = UserSession;
