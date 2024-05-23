const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    isAuth: {
        type: Boolean,
        required: true,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1d' // Automatically delete session documents after 1 day
    }
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
