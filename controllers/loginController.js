const Employee = require('../modles/employeeModel'); 
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body; // Added isAdmin

        // Checking if user is present
        const existingUser = await Employee.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send('User is already present, please login instead');
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // User creation
        const newUser = new Employee({ name, email, password: hashedPassword, isAdmin }); // Added isAdmin
        const createUser = await newUser.save();

        if (createUser) {
            return res.status(201).send(createUser);  
        } else {
            return res.status(400).send('User could not be created');
        }
    } catch (e) {
        return res.status(500).send('Internal error: ' + e.message);
    }
}

module.exports = registerUser;
