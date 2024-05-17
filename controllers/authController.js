const Employee = require('../modles/employeeModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.secretToken;

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await Employee.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User is already present');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Employee({
            name,
            email,
            password: hashedPassword
        });

        const createdUser = await newUser.save();
        res.status(201).send(createdUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while registering the user');
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await Employee.findOne({ email });
        if (!existingUser) {
            return res.status(400).send('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid email or password');
        }

        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
        });

        res.status(200).send({ message: 'Login successful', user: existingUser });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while logging in');
    }
};
const logoutUser = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
        res.status(200).send({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while logging out');
    }
};

module.exports = { registerUser, loginUser,logoutUser };
