const Employee = require('../modles/employeeModel'); 
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const jwtSecret=process.env.secretToken
const registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        // Checking if user is present
        const existingUser = await Employee.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User is already present, please login instead');
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // User creation
        const newUser = new Employee({ name, email, password: hashedPassword, isAdmin });
        const createUser = await newUser.save();

        if (createUser) {
            // Generate JWT token
            const token = jwt.sign(
                { id: createUser._id, isAdmin: createUser.isAdmin },
                jwtSecret,
                { expiresIn: '1h' }
            );

            // Set token as a cookie
            res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });

            return res.status(201).json({ 
                message: "User registered successfully", 
                user: createUser 
            });
        } else {
            return res.status(400).send('User could not be created');
        }
    } catch (e) {
        return res.status(500).send('Internal error: ' + e.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Checking if user exists
        const user = await Employee.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found, please register first');
        }

        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (e) {
        return res.status(500).send('Internal error: ' + e.message);
    }
};
module.exports={registerUser,loginUser}