const mongoose = require('mongoose');
const Employee=require('../modles/employeeModel')
const clockSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Reference to the User model
    required: true
  },
  clockInTime: {
    type: Date,
    required: true
  },
  clockOutTime: {
    type: Date,
    default: null // Default to null, indicating the user is still clocked in
  }
});

const Clock = mongoose.model('Clock', clockSchema);

module.exports = Clock;
