const mongoose=require('mongoose')
const Schema=mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'employee', 'other'],
        default: 'employee'
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

 

const User=mongoose.model('User',userSchema)
module.exports=User