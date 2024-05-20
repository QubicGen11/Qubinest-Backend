const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret=process.env.jwtSecret
const userRegister = async (req, res) => {
    try {
        // Extract user details from request body
        const { username, password } = req.body;

       
   

        // Check if user already exists
        const existingUser = await User.findOne({ username });
       

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword // Store the hashed password
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1d' });

        // Set cookie with JWT token
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        // Send success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const userLogin = async (req, res) => {
  try {
      // Extract user credentials from request body
      const { username, password } = req.body;

      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1d' });

      // Set cookie with JWT token
      res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000 
      });

      // Send success response
      res.status(200).json({ message: 'Login successful', user: { username: user.username } });
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports={userRegister,userLogin}
