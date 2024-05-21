const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d' // Automatically delete session documents after 7 days
    }
});
const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
