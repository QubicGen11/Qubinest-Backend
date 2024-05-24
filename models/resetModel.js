// resetModel.js

const mongoose = require('mongoose');

const resetSchema = new mongoose.Schema({
  // You don't need any fields for this schema as it's just for organizing purposes
});

const Reset = mongoose.model('Reset', resetSchema);

module.exports = Reset;
