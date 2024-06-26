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
        enum: ['Admin', 'Employee', 'Intern',"Manager"],
        default: 'Employee'
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