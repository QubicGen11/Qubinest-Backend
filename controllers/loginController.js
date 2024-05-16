const Employee = require('../modles/employeeModel'); // Corrected 'modles' to 'models'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const jwtSecret = process.env.secretToken;

const registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        const existingUser = await Employee.findOne({ email });

        if (existingUser) {
            return res.status(400).send('User is already present, please login instead');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const jwtToken = jwt.sign({ name, email }, jwtSecret);
        
        const newUser = new Employee({ name, email, password: hashedPassword, isAdmin });
        const newEmployee = await newUser.save();

        if (newEmployee) {
            res.cookie('jwtToken', jwtToken);
            return res.status(201).send(newEmployee);
        } else {
            return res.status(400).send('User could not be created');
        }
    } catch (error) {
        return res.status(500).send('Internal error: ' + error.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Employee.findOne({ email });

        if (!user) {
            return res.status(400).send('User not found, please register first');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const token = req.cookies.jwtToken;
        try {
            const decoded = jwt.verify(token, jwtSecret);
            if (decoded.email === email) {
                return res.status(200).json({
                    message: 'Login successful',
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin
                    }
                });
            } else {
                return res.status(401).send('Unauthorized');
            }
        } catch (error) {
            return res.status(401).send('Unauthorized');
        }
    } catch (error) {
        return res.status(500).send('Internal error: ' + error.message);
    }
};

module.exports = { registerUser, loginUser };
