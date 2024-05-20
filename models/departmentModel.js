const mongoose=require('mongoose')
const departmentSchema = new Schema({
    department_id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        index: true
    },
    department_name: {
        type: String,
        required: true,
        unique: true
    },
    manager_id: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
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
const Department=mongoose.model('Department',departmentSchema)
module.exports=Department