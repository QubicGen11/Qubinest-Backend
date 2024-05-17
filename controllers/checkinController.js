const Employee = require('../modles/employeeModel');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.secretToken;

// Clock-in function
const userClockin = async (req, res) => {
    try {
        // Check if the login token exists in the cookie
        const loginCookie = req.cookies.token;

        if (!loginCookie) {
            return res.status(400).json({ message: 'Login token not found in the cookie' });
        }

        // Set a new cookie indicating the user is clocked in
        res.cookie('clockedin', loginCookie, { httpOnly: true });

        res.status(200).json({ message: 'User clocked in successfully', isClockedIn: true, lastClockInTime: new Date() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Clock-out function
const userClockout = async (req, res) => {
    try {
        // Check if the clocked-in cookie exists
        const clockinCookie = req.cookies.clockedin;

        if (!clockinCookie) {
            return res.status(400).send('User has not clocked in');
        }

        // Clear the 'clockedin' cookie
        res.clearCookie('clockedin');

        res.status(200).send({ message: 'User clocked out successfully', isClockedIn: false, lastClockInTime: new Date() });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};
module.exports = { userClockin, userClockout };
