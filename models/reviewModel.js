const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review_id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        index: true
    },
    employee_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    review_date: {
        type: Date,
        required: true
    },
    reviewer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    manager_comments: {
        type: String,
        required: true
    },
    associate_comments: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
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
reviewSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
